import { gql } from "apollo-server-core";

export default gql`
    type User {
        id: String!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        bio: String
        avatar: String
        createdAt: String!
        updatedAt: String!
        followings: [User]
        followers: [User]
        totalFollowings: Int!
        totalFollowers: Int!
        isMe: Boolean!
        isFollowing:Boolean!
    }
`