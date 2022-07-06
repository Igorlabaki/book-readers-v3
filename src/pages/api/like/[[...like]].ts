import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export  default async function  Like(req:NextApiRequest,resp: NextApiResponse){
  
  if(req.method === 'GET'){
    try {
      const { like } = req.query
      const response = await prisma.likes.findFirst({
        where:{
          post_id: like[0],
          user_id: like[1]
        },  
      });
        return resp.status(200).json(response)
      }  catch (error) {
        console.log(error)
        return resp.status(200).json({ message: error.message})
    }
  }

  if(req.method === "POST"){
    const postInfo  = JSON.parse(req.body)
    try {
      const savedLike = await prisma.likes.create({
        data:{
          like: true,
          post:{
            connect:{
              id: postInfo.idP
            }
          },
          user:{
            connect:{
              id: postInfo.idU
            }
          }
        }
      });
      return resp.status(200).json(savedLike)
      }  catch (error) {
        return resp.json({ message: error.message})
    }
  }

  if(req.method === "DELETE"){
    const idLike  = JSON.parse(req.body)  
    try {
      const deletedlike = await prisma.likes.delete({
        where:{
            id: idLike
        }
    });
      return resp.status(200).json(deletedlike)
      }  catch (error) {
        return resp.json({ message: error.message})
    }
  }

}