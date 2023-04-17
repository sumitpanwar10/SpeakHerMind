import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    try {
        const session = await getServerSession(req, res, authOptions)
        if (!session || !session.user) {
            return res.status(401).json({ message: "Please signin to create a post." })
        }
        if (req.method === "DELETE") {
            const postId = req.body
            const result = await prisma.post.delete({
                where: {
                    id: postId,
                },
            })

            return res.status(200).json(result)
        } else {
            return res.status(405).json({ message: "Method not allowed" })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}