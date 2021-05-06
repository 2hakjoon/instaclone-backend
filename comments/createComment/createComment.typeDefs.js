import {gql} from "apollo-server"

export default gql`
    type createComnetResult{
        ok: Boolean!
        error: String
    }
    type Mutation{
        createComment(photoId: Int!, payload:String!): createComnetResult!
    }
`