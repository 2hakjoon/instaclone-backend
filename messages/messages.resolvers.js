import client from "../client";

export default {
    Room :{
        users:({id})=>client.room.findUnique({
            where:{
                id
            }
        }).users(),
        messages:({id}, {pageNumber, pageSize}) => client.message.findMany({
            skip:(pageNumber-1)*pageSize,
            take:pageSize,
            where:{
                roomId:id
            }
        }),
        unreadTotal: ({id}, _, {loggedInUser}) => {
            if(!loggedInUser){
                return 0;
            }
            return client.message.count({
                where:{
                    read:false,
                    roomId:id,
                    user:{
                        id:{
                            not: loggedInUser.id
                        }
                    }
                }
            })
        }
    }
}