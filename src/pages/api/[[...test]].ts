import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function getUser(req:NextApiRequest,resp: NextApiResponse){

  const { test } = req.query

 try {
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        id: {
          equals: test[0].toString(),
        },
      },
    },
    include:{
      Books: {
        include:{
          book: true
        }
      },
      followedBy:{
        include:{
          follower: true,
        }
      },
      following:{
        include:{
          following: true
        }
      },
      Likes: true,
      Posts:{
        include:{
          Comments:{
            include:{
              user: true
            },
          },
          book: true,
          Likes:{
            include:{
              user: true
            }
          },
          user: {
            include:{
              Books: true
            }
          }
        }
      },
     user_notifications: {
        include:{
          userNotification: true,
          userAction: true
        }
      },
    }
  });
  return resp.status(200).json(users)

 } catch (error) {
  console.log(error)
  return resp.json(error)

 }

}