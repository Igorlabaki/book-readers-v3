import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler( req: NextApiRequest, resp: NextApiResponse){

  if(req.method == 'GET'){
    const data = await prisma.user.findMany();
    resp.status(200).json(data)
  }

}