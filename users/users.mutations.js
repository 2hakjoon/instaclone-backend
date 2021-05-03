import client from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    Mutation:{
        createAccount: async(_, {
            firstName,
            lastName,
            username,
            email,
            password
        })=>{
            //check if username or email are already on DB.
            try{
                const existingUser = await client.user.findFirst({
                    where : {
                        OR:[
                            {
                                username,
                            },
                            {
                                email,
                            }
                        ],
                    },
                });
                if(existingUser){
                    throw new Error("This username/password is already taken");
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                return client.user.create({data:{
                    username, email, firstName, lastName, password:hashedPassword
                }})
            }
            catch(e){
                return e;
            }
        },
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