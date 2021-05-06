import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    seeFeed: protectedResolver(async (_, {pageNumber, pageSize}, { loggedInUser }) => {
      return client.photo.findMany({
        skip:(pageNumber-1)*pageSize,
        take:pageSize,
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  },
};