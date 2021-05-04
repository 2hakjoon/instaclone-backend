import client from "../../client";


export default{
    Query:{
        seeFollowings: async (_,{username, lastId}) => {
            const ok = await client.user.findUnique({
                where:{username}, select:{id:true},
            });
            if(!ok){
                return{
                    ok:false,
                    error:"User not found",
                }
            }

            const followings = await client.user.findUnique({
                where:{
                    username
                }
            }).followings({
                take:5,
                skip: lastId ? 1 : 0,
                ...(lastId && {cursor: {id : lastId}})
            });

            const totalFollowings = await client.user.count({
                where:{
                    followings:{
                        some:{
                            username
                        }
                    }
                }
            });
            return{
                ok: true,
                followings,
                totalPages:Math.ceil(totalFollowings/5)
            }
        }
    }
}