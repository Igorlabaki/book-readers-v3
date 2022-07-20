import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export  default async function  Like(req:NextApiRequest,resp: NextApiResponse){
  
  if(req.method === "POST"){
    const followInfo  = JSON.parse(req.body)
    try {
      const follow = await prisma.follows.create({
        data:{
        followerId: followInfo.followerId,
        followingId: followInfo.followingId
        }
      });
      return resp.status(200).json(follow)
      }  catch (error) {
        return resp.json({ message: error.message})
    }
  }

  
  if (req.method === "DELETE") {

    const followData = JSON.parse(req.body)

    try {
        const follow = await prisma.follows.findFirst({
          where:{
              followerId: followData.followingId,
              followingId: followData.followerId
          }
      });

      const followDeleted = await prisma.follows.delete({
        where:{
           followerId_followingId: {
            followerId: follow.followerId,
            followingId: follow.followingId
           }
        }
    });
      return resp.status(200).json(followDeleted)
    } catch (error) {
      console.log(error)
      return resp.json({ message: error.message })
    }
  }

}