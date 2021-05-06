import {gql} from "apollo-server-core"

export default gql`
    type Photo{
        id: Int!
        user: User!
        file: String!
        caption: String
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
        likes: Int!
        comments: [Comment]
        totalComments: Int!
        isMineL:Boolean!
    }
    type Hashtag{
        id: Int!
        hashtag: String!
        photos(page: Int!): [Photo]
        totalPhotos: Int!
        createdAt: String!
        updatedAt: String!
    }
    type Like {
        id: Int!
        user:User!
        photo:Photo!
        createdAt: String!
        updatedAt: String!
    }
`