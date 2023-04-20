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
    comment?: {
        id: string
        postId: string
        userId: string
    }[]
}

export default function EditPost({

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
            <div className="bg-white my-8 p-8 rounded-lg">

                <div className="flex items-center gap-2">

                    <h3 className="font-bold text-gray-700">Whisperer-{name.substring(0, 5)}</h3>
                </div>
                <div className="my-8 ">
                    <p className="break-all">{title}</p>

                </div>
                <div className="flex items-center justify-between ">
                    <Link href={`/post/${id}`}>
                    <p className=" text-sm font-bold text-gray-600">
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