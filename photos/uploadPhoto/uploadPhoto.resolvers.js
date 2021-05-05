import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
    Mutation:{
        uploadPhoto: protectedResolver(
            async(_,{file, caption}, {loggedInUser})=>{
                let hashtagObjs = [];
                if(caption){
                    hashtagObjs = processHashtags(caption)
                    // parse caption
                    // get or create Hashtags
                }
                return client.photo.create({
                    data:{
                        file,
                        caption,
                        user:{
                            connect:{
                                id: loggedInUser.id
                            }
                        },
                        ...(hashtagObjs.length > 0 && {
                            hashtags:{
                                connectOrCreate: hashtagObjs
                            }
                        })
                    }
                })
                // save the photo With the parsed hashtags
                // add the 
            }
        )
    }

}