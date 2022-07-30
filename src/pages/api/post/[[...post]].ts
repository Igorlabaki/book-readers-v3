import { Console } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../lib/prisma'

export default async function Post(req:NextApiRequest,resp: NextApiResponse){
    

    if(req.method === 'POST'){
        const postInfo = JSON.parse(req.body)
            try {
                const savedPost = await prisma.posts.create({
                    data: {
                     text: postInfo.postText,
                     user:{
                         connect:{
                             id: postInfo.userId
                         }
                     },
                     book:{
                        connect:{
                            id: postInfo.bookId
                        }
                     },
                    },
                  }); 
                  return resp.json(savedPost)
            } catch (error) {
                console.log(error)
                return resp.json({ message: error.message})
            }
    }

    if(req.method === 'GET'){
        const { post } = req.query
        if(post){
            try {
                const response = await prisma.posts.findFirst({
                  where:{
                    id: post[0]
                  },
                  include:{
                    user: {
                        include: {
                            Books: true
                        }
                    },
                    book: true,
                    Comments: {
                        include:{
                            user: true,
                            post: true
                        }
                    },
                    Likes: {
                        include:{
                            user: true,
                            post: true,
                        }
                    }
                },
                });
                  return resp.status(200).json(response)
                }  catch (error) {
                  console.log(error)
                  return resp.status(200).json({ message: error.message})
              }
        }
        try {
            const post = await prisma.posts.findMany({
                include:{
                    user: {
                        include: {
                            Books: true
                        }
                    },
                    book: true,
                    Comments: {
                        include:{
                            user: true,
                            post: true
                        }
                    },
                    Likes: {
                        include:{
                            user: true,
                            post: true,
                        }
                    }
                },
                orderBy:{
                    updatedAt: 'desc'
                }
            })
            return resp.status(200).json(post)
        } catch (error) {
            return resp.json({ message: error.message})
        }
    }

    if(req.method === 'PUT'){
        const postInfo = JSON.parse(req.body)
        try {
            const post = await prisma.posts.update({
               where:{
                id: postInfo.id
               },
               data:{
                text: postInfo.text
               }
            })
            return resp.status(200).json(post)
        } catch (error) {
            return resp.json({ message: error.message})
        }
    }

    if(req.method === 'DELETE'){
        const postInfo = JSON.parse(req.body)

        try {
            const post = await prisma.posts.delete({
               where:{
                id: postInfo
               }
            })
            return resp.status(200).json(post)
        } catch (error) {
            return resp.json({ message: error.message})
        }

    }


}