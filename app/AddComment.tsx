'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import axios, {AxiosError} from "axios"
import {  toast } from "react-hot-toast"

type Comment = {
    postId?: string
    title: string
}

type PostProps = {
    id?:string
}

export default function AddComment({id}: PostProps){
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient =  useQueryClient()
    let commentToastId: string
    const {mutate} = useMutation(
        async(data: Comment) => await axios.post('/api/posts/addComment', {data}),
        {
            onSuccess: (data) => {
                setTitle("")
                setIsDisabled(false)
                queryClient.invalidateQueries(['detail-post'])
                toast.success("Comment added.", {id : commentToastId})
            },
            onError: (error)=>{
                console.log(error)
                setIsDisabled(false)
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, { id: commentToastId })
                }
            },
        }
    )

    const submitComment = async (e: React.FormEvent)=>{
        e.preventDefault()
        setIsDisabled(true)
        commentToastId = toast.loading('Adding your comment', {
            id: commentToastId
        })
        mutate({ title, postId: id })
    }

    return(
        <form onSubmit={submitComment} className="my-8">
            <h1 className="text-yellow-400 pt-4">Add a comment</h1>
            <div className="flex flex-col my-4">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    name='title'
                    type="text"
                    value={title}
                    placeholder="Add your comment here"
                    className="p-4 text-sm rounded-md my-2 bg-gray-200"
                
                />
            </div>

            <div>
                <button
                    disabled={isDisabled}
                    className="text-sm bg-sky-400 font-medium text-gray-800 py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >
                    Comment
                </button>
            </div>
        </form>
    )
}