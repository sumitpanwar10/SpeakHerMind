'use client'
import axios from "axios"
import AddPost from "./components/AddPost"
import { useQuery } from '@tanstack/react-query'

//fetch all posts
const allPosts = async ()=> {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}
export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ["posts"],
  })
  if (error) return <div>error</div>
  if (isLoading) return <div>Loading...</div>
  

  return ( 
    <div>
      <AddPost />
      
    </div>
  )
}
