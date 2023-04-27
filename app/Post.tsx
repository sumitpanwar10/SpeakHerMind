'use client'

import Link from "next/link"
type PostProps = {
  id: string
  name: string
  postTitle: string
  createdAt: string
  comment?: {
    id: string
    postId: string
    userId: string
  }[]
  
}

export default function Post({ id, name, postTitle, comment, createdAt}:PostProps) {
    return (
      <div className="bg-gray-800 border border-gray-700 my-6 p-6 rounded-lg ">
        <div className="flex items-center justify-between gap-2">
          {/* <h3 className="font-bold text-gray-700">Anonymous</h3> */}
          
          <h3 className="font-bold text-lg text-yellow-400">Whisperer-{name.substring(6, 11)}</h3>
            <h2 className="text-xs text-gray-600">{createdAt.substring(0, 10)}</h2>
          
        </div>
        <div className="my-8">
          <p className="text-sm text-white break-all">{postTitle}</p>
        </div>
        <div className="flex gap-4 cursor-pointer items-center">
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold text-sky-400">{comment?.length} Comments</p>
          </Link>
        </div>
      </div>
    )
}