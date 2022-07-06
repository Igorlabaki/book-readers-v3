import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function Comment(req: NextApiRequest, resp: NextApiResponse) {

  if (req.method === "POST") {
    const postInfo = JSON.parse(req.body)
    try {
      const savedComment = await prisma.comments.create({
        data: {
          text: postInfo.comment,
          post: {
            connect: {
              id: postInfo.id
            }
          },
          user: {
            connect: {
              id: postInfo.user
            }
          }
        }
      });
      return resp.status(200).json(savedComment)
    } catch (error) {
      return resp.json({ message: error.message })
    }
  }

  if (req.method === "GET") {
    const { comment } = req.query
    try {
      const comments = await prisma.comments.findMany({
        where: {
          post_id: comment[0],
        },
        include: {
          post: true,
          user: true,
        }
      });
      return resp.status(200).json(comments)
    } catch (error) {
      return resp.json({ message: error.message })
    }
  }

}