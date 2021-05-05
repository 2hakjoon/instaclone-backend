import client from "../../client";

export default {
    Query:{
        seePhotoLikes:async(_,{id})=> {
            const likes = await client.user.findMany({
                where:{
                    likes:{
                        some:{
                            photoId:id
                        }
                    }
                }
            })
            console.log(likes)
            return likes
        }
    }
}