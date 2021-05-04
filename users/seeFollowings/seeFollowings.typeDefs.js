import {gql} from "apollo-server-core"

export default gql`
    type seeFollowingsQuery{
        ok: Boolean!
        error: String
        followings: [User]
        totalPages: Int
    }
    type Query{
        seeFollowings(username:String!, lastId:Int): seeFollowingsQuery!
    }
`