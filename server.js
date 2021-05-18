require('dotenv').config();
import express from "express";
import logger from "morgan";
import http from "http";
import { ApolloServer } from 'apollo-server-express';
import {typeDefs, resolvers} from "./schema";
import { getUser} from './users/users.utils';



const PORT = process.env.PORT;
const app = express();
const apollo = new ApolloServer({
    typeDefs,resolvers,
    context: async(ctx) => {
        if(ctx.req){
            return {
                loggedInUser : await getUser(ctx.req.headers.token)
            }
        }
        else{
            const {connection:{context}} = ctx;
            return{
                loggedInUser: context.loggedInUser
            }
        }
    },
    subscriptions:{
        onConnect : async ({token}) => {
            if(!token){
                throw new Error("You can't listen.")
            }
            const loggedInUser = await getUser(token);
            return {loggedInUser}
        }
    }
});

apollo.applyMiddleware({app});

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer)

app.use(logger("dev"));
app.use("/static", express.static("uploads"))


httpServer.listen(PORT, () =>{
    console.log(`🚀  Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀  Server ready at ws://localhost:${PORT}/graphql`);
});
