import {createWriteStream} from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shaerd.utils";

export default {
    Mutation:{
        editProfile : protectedResolver(
            async(_, {
                firstName,
                lastName,
                username,
                email,
                password : newPassword,
                bio,
                avatar
            },{loggedInUser}) => {
                let avatarUrl = null;
                if(avatar){
                    avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");/*
                    const {filename, createReadStream} = await avatar;
                    const ext = filename.split(".")[1];
                    const newFilename = `${loggedInUser.id}.${ext}`
                    const readStream = createReadStream();
                    const writeStream = createWriteStream(process.cwd()+"/uploads/"+ newFilename);
                    readStream.pipe(writeStream);
                    avatarUrl=`http://localhost:4000/static/${newFilename}`*/

                }
                let uglyPassword = null;
                if(newPassword){
                    uglyPassword = await bcrypt.hash(newPassword, 10)
                }
                const updatedUser = await client.user.update({
                    where:{
                        id:loggedInUser.id
                    },
                    data:{
                        firstName,
                        lastName,
                        username,
                        email,
                        bio,
                        ...(uglyPassword && {password: uglyPassword}),
                        ...(avatarUrl && {avatar: avatarUrl})
                    }
                });
                if(updatedUser.id){
                    return{
                        ok : true
                    }
                }
                else{
                    return {
                        ok : false,
                        error : "Could not update profile"
                    }
                }
            }
        )
    },
};