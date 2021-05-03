import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    Mutation:{
        login: async(_,{username, password}) => {
            //find user with args.username
            const user =await client.user.findFirst({where:{username}})
            if(!user){
                return {
                    ok:false,
                    error:"User not found",
                };
            }
            const passwordOk = await bcrypt.compare(password, user.password);
            if(!passwordOk){
                return {
                    ok:false,
                    error: "Incorrect password"
                }
            }
            const token = await jwt.sign({id:user.id}, process.env.SECRET_KEY);
            return {
                ok:true,
                token,
            }
            //check password with args.password
            //issue a token and send it to the user
        }
    },
};