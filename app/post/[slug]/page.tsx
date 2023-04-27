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
                id={data?.id ?? ''}
                name={data?.user.id ?? ''}
                postTitle={data?.title ?? ''}
                comment={data?.comment ?? []}
                createdAt={data?.createdAt ?? ''}
            />
            <AddComment id={data?.id} />
            {data?.comment?.map((comment) => (
                <div
                    className="my-6 bg-gray-800 border border-gray-700 p-6 rounded-md"
                    key={comment.id}
                >
                    <div className="flex items-center justify-between gap-2">

                        <h3 className="font-bold text-sm text-yellow-400">Whisperer-{comment?.user?.id.substring(6, 11)}</h3>
                        <h2 className="text-xs text-gray-600">{comment?.createdAt?.substring(0, 10)}</h2>
                    </div>
                    <div className="py-4 text-white text-sm">{comment.message}</div>
                </div>
            ))}
        </div>
    )
}