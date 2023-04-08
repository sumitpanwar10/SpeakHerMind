import prisma from "../../../prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: { method: string }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { err: string }): void; new(): any } } }){
   
    if (req.method === "GET") {
        
        //Fetch all Post
        try {
            const data = await prisma.post.findMany({
                include:{
                    user:true,
                },
                orderBy:{
                    createdAt: "desc",
                },
            })
            res.status(200).json(data)
            console.log("data fetched")
        } catch (err) {
            res.status(403).json({ err: "Error has occured while fetching post." })
        }
    }
}