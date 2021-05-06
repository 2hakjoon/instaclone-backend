import { gql } from "apollo-server-core";

export default gql`
    type User {
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        bio: String
        avatar: String
        photos:[Photo]
        createdAt: String!
        updatedAt: String!
        followings: [User]
        followers: [User]
        totalFollowings: Int!
        totalFollowers: Int!
        isMe: Boolean!
        comments: [Comment]
        isFollowing:Boolean!
    }
`