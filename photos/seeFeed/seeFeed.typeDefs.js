import {gql} from "apollo-server"

export default gql`
  type Query {
    seeFeed(pageNumber:Int!, pageSize:Int!):[Photo]
  }
`;