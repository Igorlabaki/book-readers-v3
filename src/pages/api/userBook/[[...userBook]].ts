import { count } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma"

export default async function getUser(req:NextApiRequest,resp: NextApiResponse){

    if(req.method === 'PUT'){
        const postInfo = JSON.parse(req.body)
        try {
            const userBook = await prisma.userBooks.update({
               where:{
                id: postInfo.id
               },
               data:{
                listType: postInfo.listType,
                rate: postInfo.rate
               }
            })

            const post =  await prisma.posts.findFirst({
              where:{
                user_id: userBook.fk_id_user,
                book_id: userBook.fk_id_book
              },
           })

           const postUpdate = await prisma.posts.update({
            where:{
             id: post.id
            },
            data:{
              updatedAt:postInfo.date,
              text: postInfo.text
            }
         })


            return resp.status(200).json(userBook)
        } catch (error) {
            return resp.json({ message: error.message})
        }
    }

    if(req.method === 'GET'){
  
      if(req.query.userBook[0] === 'mostReadBook'){
        try {
          const response = await prisma.books.findMany({
            take:5,
            where:{
              User:{
                some:{
                  AND: { listType : 'Read'}
                }
              }
            },
            include:{
              User:{
                include:{
                  book: true
                }
              },
            },
            orderBy:{
              User: {
                _count: 'desc',
              }
            }
          });
            return resp.status(200).json(response)
          }  catch (error) {
            return resp.status(200).json({ message: error.message})
        }
      }else if(req.query.userBook[0] === 'ratingBook'){
        try {
          const response = await prisma.books.findMany({
            take: 5,
            include:{
              Posts:{
                include:{
                  book: true
                }
              },
            },
            orderBy:{
              Posts: {
                _count: 'desc',
              }
            }
          });
            return resp.status(200).json(response)
          }  catch (error) {
            return resp.status(200).json({ message: error.message})
        }
      }
      else{
        try {
          const response = await prisma.books.findMany({
            take: 5,
            where:{
              Posts: {
               some:{
                id: { not: ''}
               }
              }
            },
            include:{
              Posts:{
                include:{
                  book: true
                }
              },
            },
            orderBy:{
              Posts: {
                _count: 'desc',
              }
            }
          });
            return resp.status(200).json(response)
          }  catch (error) {
            return resp.status(200).json({ message: error.message})
        }
      }
  
    }

    
    if(req.method === 'DELETE'){
      
      const userBookInfo = JSON.parse(req.body)

      try {
        const post =  await prisma.posts.findFirst({
          where:{
            user_id: userBookInfo.fk_id_user,
            book_id: userBookInfo.fk_id_book
          },
       })
       const deletedPost = await prisma.posts.delete({
        where:{
         id: post.id
        }
     })
          const userBook = await prisma.userBooks.delete({
             where:{
              id: userBookInfo.id
             }
          })
          return resp.status(200).json(userBook)
      } catch (error) {
        console.log(error)
          return resp.json({ message: error.message})
      }

  }


  if(req.method === 'POST'){
    const postInfo = JSON.parse(req.body)
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
                    },
                    listType: postInfo.listType,
                    rate: postInfo.rate
                },
            });
              return resp.json(savedBookUser)
        } catch (error) {
            console.log(error)
            return resp.json({ message: error.message})
        }
  
}


}