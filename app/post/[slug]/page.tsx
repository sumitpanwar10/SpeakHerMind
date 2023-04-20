'use client'

import Post from "@/app/Post"
import { PostPageType } from "@/app/Types/PostPage"
import { motion } from "framer-motion"
import { useQuery } from "react-query"
import axios from "axios"
import { Url } from "next/dist/shared/lib/router/router"
import AddComment from "@/app/AddComment"

type URL = {
    params: {
        slug: string
    }
}

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

export default function PostDetail(url: URL) {
    const { data, isLoading } = useQuery<PostPageType>({
        queryKey: ["detail-post"],
        queryFn: () => fetchDetails(url.params.slug),
    })
    if (isLoading) return "Loading"

    return (
        <div>
            <Post
                id={data?.id}
                name={data?.user.id}
                postTitle={data?.title}
                comment={data?.comment}
            />
            <AddComment id={data?.id} />
            {data?.comment?.map((comment) => (
                <div
                    className="my-6 bg-white p-8 rounded-md"
                    key={comment.id}
                >
                    <div className="flex items-center gap-2">

                        <h3 className="font-bold">Whisperer-{comment?.user?.id.substring(0, 5)}</h3>
                        <h2 className="text-sm">{comment.createdAt}</h2>
                    </div>

                    <div className="py-4">{comment.message}</div>
                </div>
            ))}
        </div>
    )
}