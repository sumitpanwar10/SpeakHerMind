'use client'
import axios from "axios"
import AddPost from "./AddPost"
import { useQuery } from 'react-query'
import Post from "./Post"
import { Key } from "react"
import { PostType } from "./Types/Post"

//fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}
export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  })
  if (error) return <div>error</div>
  if (isLoading) return <div>Loading...</div>


  return (
    <div>
      <AddPost />
      {data?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.id}
          // avatar={post.user.image}
          postTitle={post.title}
          comment={post.comment} />
      ))}
    </div>
  )
}
