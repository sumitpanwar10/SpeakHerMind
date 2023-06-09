"use client"

import EditPost from "./EditPost"
import { useQuery } from "react-query"
import axios from "axios"
import { AuthPosts } from "../Types/AuthPosts"
import QueryWrapper from "../auth/QueryWrapper"
const fetchAuthPosts = async () => {
    const response = await axios.get("/api/posts/authPosts")
    return response.data
}

export default function MyPosts(): JSX.Element {
    const { data, isLoading } = useQuery<AuthPosts>(
        "getAuthPosts",
        fetchAuthPosts
    )
    if (isLoading) return <div className="text-gray-200">Posts are loading...</div>
    
    return (
        <QueryWrapper>
        <div>
            {data?.posts?.map((post) => (
                <EditPost
                    id={post.id}
                    key={post.id}
                    name={data.id}
                    title={post.title}
                    comment={post.comment}
                    createdAt={post.createdAt}
                />
            ))}
        </div>
        </QueryWrapper>
    )
}