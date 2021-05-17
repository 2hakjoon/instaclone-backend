import client from "../client";


export default {
    Photo: {
        user: ({userId})=>{
            return client.user.findUnique({where:{id:userId}});
        },
        hashtags: ({id})=>{
            return client.hashtag.findMany({
                where:{
                    photos:{
                        some:{
                            id
                        }
                    }
                }
            })
        },
        likes: ({id}) => client.like.count({where : {photoId : id}}),
        comments:({id})=> client.photo.findUnique({where:{id}}).comments(),
        totalComments:({id}) => client.comment.count({where:{photoId:id}}),
        isMine:({userId},_,{loggedInUser})=>{
            if(!loggedInUser){
                return false
            }
            return userId === loggedInUser.id
        }
    },
    Hashtag:{
        photos: ({id}) => {
            return client.hashtag.findUnique({
                where:{
                    id,
                }
            }).photos()
        },
        totalPhotos:({id})=> client.photo.count({
            where:{
                hashtags:{
                    some:{
                        id,
                    }
                }
            }
        })
    }
}