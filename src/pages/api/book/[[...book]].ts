import { Console } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../lib/prisma'

export default async function Post(req:NextApiRequest,resp: NextApiResponse){

  
  if(req.method === 'POST'){
        const bookInfo = JSON.parse(req.body)
        let authors 
        let categories 
        let description
      
        if(bookInfo?.volumeInfo?.categories != undefined){
          categories = bookInfo?.volumeInfo?.categories[0]
        }
        if(bookInfo.volumeInfo?.authors != undefined){
          authors = bookInfo?.volumeInfo?.authors[0]
        }
      
        if(bookInfo?.volumeInfo?.description != undefined){
          description = bookInfo?.volumeInfo?.description.slice(0,  200)
        }
      
        try {
          const savedBook = await prisma.books.create({
            data: {
              authors:        authors     || "",
              categories:     categories   || "",
              description:    description     || "",
              pageCount:      bookInfo?.volumeInfo?.pageCount || "",
              google:         bookInfo?.id,
              publishedDate:  bookInfo?.volumeInfo?.publishedDate   || "",
              smallThumbnail: bookInfo?.volumeInfo?.imageLinks?.smallThumbnail || "",
              subtitle:       bookInfo?.volumeInfo?.subtitle        || "",
              title:          bookInfo?.volumeInfo?.title        || "",
            },
          });
          return resp.status(200).json(savedBook)
        } catch (error) {
            return resp.json(error)
        }
    }

    
    if(req.method === 'GET'){

      if(req.query.book ){
        const { book: id } = req.query
        console.log(req.query)
        try {
          const response = await prisma.books.findFirst({
           where:{
            google: id[0]
           },
           include:{
            User: true,
            Posts: true
           }
          });
            return resp.status(200).json(response)
          }  catch (error) {
            return resp.status(200).json({ message: error.message})
        }
      }
  }


}