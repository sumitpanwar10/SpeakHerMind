'use client'

import Link from "next/link"
// type PostProps = {
//   id: string
//   name: string
//   postTitle: string
//   comment?: {
//     id: string
//     postId: string
//     userId: string
//   }[]
// }

export default function Post({ id, name, postTitle, comment }) {
    return (
      <div className="bg-white my-8 p-8 rounded-lg ">
        <div className="flex items-center gap-2">
          {/* <h3 className="font-bold text-gray-700">Anonymous</h3> */}
          
            <h3 className="font-bold text-gray-700">Whisperer-{name.substring(0, 5)}</h3>
          
          
        </div>
        <div className="my-8">
          <p className="break-all">{postTitle}</p>
        </div>
        <div className="flex gap-4 cursor-pointer items-center">
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold text-gray-600">{comment?.length} Comments</p>
          </Link>
        </div>
      </div>
    )
}