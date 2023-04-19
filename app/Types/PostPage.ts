export type PostPageType = {
    id: string
    title: string
    updatedAt?: string
    user: {
        email: string
        id: string
        name: string
    }
    comment: {
        message: string
        createdAt?: string
        id: string
        postId: string
        title: string
        userId: string
        user: {
            email: string
            id: string
            name: string
        }
    }[]
}