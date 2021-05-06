import client from "../../client";


export default {
    Query:{
        seePhotoComments:(_,{id, pageSize, pageNumber})=>client.photo.findUnique({
            skip:(pageNumber-1)* pageSize,
            take:(pageSize),
            where:{
                photoId:id,
            },
            orderBy:{
                createdAt : "asc"
            }
        }).comments()
    }
}