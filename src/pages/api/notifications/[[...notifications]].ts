import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../lib/prisma'

export default async function Notifications(req:NextApiRequest,resp: NextApiResponse){
    
    if (req.method === "POST") {
        const notificationInfo = JSON.parse(req.body)
        if(notificationInfo.user_action != notificationInfo.user_id){
          try {
            if(notificationInfo.post_id){
              const notification = await prisma.notifications.create({
                data:{
                  userAction:{
                    connect: {
                      id: notificationInfo.user_action
                    }
                  },
                  userNotification:{
                    connect:{
                      id: notificationInfo.user_id
                    }
                  },
                  post: {
                    connect: {
                      id: notificationInfo.post_id,
                    }
                  },
                  text: notificationInfo.text
                }
              })
              return resp.status(200).json(notification)
            }else{
              const notification = await prisma.notifications.create({
                data:{
                  userAction:{
                    connect: {
                      id: notificationInfo.user_action
                    }
                  },
                  userNotification:{
                    connect:{
                      id: notificationInfo.user_id
                    }
                  },
                  text: notificationInfo.text
                }
              })
              return resp.status(200).json(notification)
            }
          } catch (error) {
            console.log(error)
            return resp.json({ message: error.message })
          }
        }
      }

      if(req.method === 'PUT'){
        const commentInfo = JSON.parse(req.body)
        try {
            const post = await prisma.notifications.update({
               where:{
                id: commentInfo.id
               },
               data:{
                view: true
               }
            })
            return resp.status(200).json(post)
        } catch (error) {
            return resp.json({ message: error.message})
        }
    }


}