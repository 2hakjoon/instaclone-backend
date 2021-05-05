import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation:{
        uploadPhoto: protectedResolver(
            async(_,{file, caption}, {loggedInUser})=>{
                let hashtagObjs = [];
                if(caption){
                    const hashtags = caption.match(/#[\w]+/g);
                    hashtagObjs = hashtags.map(hashtag => ({
                        where:{hashtag}, create:{hashtag}
                    }))
                    console.log(hashtagObjs)
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