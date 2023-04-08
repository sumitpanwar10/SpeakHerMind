'use client'
import axios from "axios"
import AddPost from "./components/AddPost"
import { useQuery } from '@tanstack/react-query'
import Post from "./components/Post"
//fetch all posts
const allPosts = async ()=> {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}
export default function Home({ name, postTitle }) {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ["posts"],
  })
  if (error) return <div>error</div>
  if (isLoading) return <div>Loading...</div>
  

  return ( 
    <div>
      <AddPost />
      {data?.map((post)=>(
        <Post 
          key={post.id}
          postTitle={post.title}
          name={post.user.name}
          // avatar={post.user.image}
          
          // comments={post.comments}
        />
      )
      )
      }
    </div>
  )
}
