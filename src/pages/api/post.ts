import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'

export default async function Post(req:NextApiRequest,resp: NextApiResponse){
    

    if(req.method === 'POST'){
        const postInfo = JSON.parse(req.body)

        if(postInfo.bookId){
            try {
                const savedBookUser = await prisma.userBooks.create({
                    data: {
                    book:{
                        connect:{
                        id: postInfo.bookId
                        }
                    },
                    user:{
                        connect:{
                        id: postInfo.userId
                        }
                    }
                    },
                });
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
                  return resp.json(savedBookUser)
            } catch (error) {
                console.log(error)
                return resp.json({ message: error.message})
            }
        }else{
            try {
                const postInfo = JSON.parse(req.body)
                
                const post = await prisma.posts.create({
                    data:{
                        text: postInfo.text,
                        user:{
                            connect:{
                                id: postInfo.user_id
                            }
                        },
                    }
                })
                
                return resp.status(200).json(post)
    
            } catch (error) {
                return resp.json({ message: error.message})
            }
        }
    }

    if(req.method === 'GET'){
        try {
            const post = await prisma.posts.findMany({
                include:{
                    user: true,
                    book: true,
                    Comments: true,
                    Likes: true
                },
                orderBy:{
                    created_at: 'desc',
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
                id: postInfo.id
               }
            })
            return resp.status(200).json(post)
        } catch (error) {
            return resp.json({ message: error.message})
        }
    }


}