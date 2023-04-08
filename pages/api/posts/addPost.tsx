import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../prisma/client'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST"){
        const session = await getServerSession(req, res, authOptions)
        if(!session)
            return res.status(404).json({message: "Please sign in to make a post."})
        const title: string = req.body.title

        const prismaUser =await prisma.user.findUnique({
            where: {email: session?.user?.email}
        })

        // limit code if statement
        if (title.length > 800)
            return res.status(403).json({ message: "Please write shorter post" })
        if (title.length)
            return res.status(403).json({ message: "Please write something" })

        //create  post
        try{
            const result = await prisma.post.create({
                data:{
                    title,
                    userId: prismaUser.id,
                },
            })
            res.status(200).json(result)
        }catch(err){
            res.status(403).json({err: "Something went wrong."})
        }


    }
}