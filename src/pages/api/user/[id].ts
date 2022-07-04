import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function getUser(req:NextApiRequest,resp: NextApiResponse){

const { id } = req.query

const teste = id

 try {

  const user = await prisma.user.findUnique({
    where:{
        id: teste
    },
    include:{
      Books: true,
      Likes: true,
      Posts:true
    }
  });

  return resp.status(200).json(user)

 } catch (error) {

  return resp.json({ message: error.message})

 }

}