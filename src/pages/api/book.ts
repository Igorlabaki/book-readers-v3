import { Console } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../lib/prisma'

export default async function Post(req:NextApiRequest,resp: NextApiResponse){

    const bookInfo = JSON.parse(req.body)

    if(req.method === 'POST'){
        let authors 
        let categories 
        let description
        let currentlyReading
        let wantRead
      
        if(bookInfo?.volumeInfo?.categories != undefined){
          categories = bookInfo?.volumeInfo?.categories[0]
        }
        if(bookInfo.volumeInfo?.authors != undefined){
          authors = bookInfo?.volumeInfo?.authors[0]
        }
      
        if(bookInfo?.volumeInfo?.description != undefined){
          description = bookInfo?.volumeInfo?.description.slice(0,  200)
        }
      
        if(bookInfo?.list?.includes('currently')){
          currentlyReading = true
          wantRead = false
        }else if(bookInfo?.list?.includes('wantRead')){
          currentlyReading = false
          wantRead = true
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
            return resp.json({ message: error.message})
        }
    }
}