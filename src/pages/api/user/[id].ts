import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function getUser(req:NextApiRequest,resp: NextApiResponse){

const { id } = req.query

const teste = id.toString()

 try {

  const user = await prisma.user.findUnique({
    where:{
        id: teste.toString()
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

  return resp.status(200).json(user)

 } catch (error) {
  console.log(error)
  console.log('CARALHOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
  return resp.json({ message: error.message})

 }

}