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
        if (req.method === "GET") {
            const data = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email,
                },
                include: {
                    posts: {
                        orderBy: {
                            createdAt: "desc",
                        },
                        include: {
                            comment: true,
                        },
                    },
                },
            })

            return res.status(200).json(data)
        } else {
            return res.status(405).json({ message: "Method not allowed" })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}