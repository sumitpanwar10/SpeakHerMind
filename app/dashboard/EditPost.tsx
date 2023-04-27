"use client"


import { useState } from "react"
import { MdDelete } from 'react-icons/md'
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import axios from "axios"
import Toggle from "./Toggle"
import Link from "next/link"



type EditProps = {
    id: string
    name: string
    title: string
    createdAt: string
    comment?: {
        id: string
        postId: string
        userId: string
    }[]
}

export default function EditPost({
    createdAt,
    name,
    title,
    comment,
    id,
}: EditProps) {
    const [toggle, setToggle] = useState(false)
    const queryClient = useQueryClient()
    let deleteToastID: string

    const { mutate } = useMutation(
        async (id: string) =>
            await axios.delete("/api/posts/deletePost", { data: id }),
        {
            onError: (error: any) => {
                console.log(error)
            toast.error("Error caught while deleting the post.", { id: deleteToastID })
            },
            onSuccess: (data: any) => {
                console.log(data)
                queryClient.invalidateQueries("getAuthPosts")
                toast.success("Post has been deleted.", { id: deleteToastID })
            },
        }
    )

    const deletePost = () => {
        deleteToastID = toast.loading("Deleting your post.", { id: deleteToastID })
        mutate(id)
    }

    return (
        <>
            <div className="bg-gray-800 border border-gray-700 my-6 p-6 rounded-lg">

                <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-lg text-yellow-400">Whisperer-{name.substring(6, 11)}</h3>
                    <h2 className="text-xs text-gray-600">{createdAt.substring(0, 10)}</h2>
                </div>
                <div className="my-8 ">
                    <p className="text-sm text-white break-all">{title}</p>

                </div>
                <div className="flex items-center justify-between ">
                    <Link href={`/post/${id}`}>
                        <p className="text-sm font-bold text-sky-400">
                        {comment?.length} Comments
                    </p>
                    </Link>
                    <button 
                    onClick={(e)=>{
                    setToggle(true)
                    }} 
                    className="text-xl text-red-500">
                      <MdDelete />
                    </button>

                </div>

            </div>
            {toggle && < Toggle deletePost={deletePost} setToggle={setToggle }/>}
        </>
    )
}