import client from "../../client";
import { protectedResolver } from "../users.utils";


export default{
    Query:{
        seeProfile:protectedResolver(async(_,{username})=>{
            return client.user.findUnique({
                where:{
                    username,
                },
                include:{
                    followings:true,
                    followers:true,
                }
            })
        })
    }

}