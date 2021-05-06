import {gql} from "apollo-server"


export default gql`
    type Query{
        seePhotoComments(id:Int!, pageNumber:Int!, pageSize:Int!):[Comment]
    }
`