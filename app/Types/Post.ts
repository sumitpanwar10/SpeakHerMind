import { Key } from "react"

export type PostType = {
    id: Key
    title: string
    createAt: string
    user: {
        name: string
        id: string
    }
    comment?:{
        createdAt: string
        id: string
        postId: string
        userId: string
    }[]
}

