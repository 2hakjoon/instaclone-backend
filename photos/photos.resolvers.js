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
        }
    },
    Hashtag:{
        photos: ({id}, {page}) => {
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