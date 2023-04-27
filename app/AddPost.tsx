'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import toast from 'react-hot-toast'
let toastPostID: string

export default function CreatePost() {
    const queryClient = useQueryClient()
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)

    //creating post
    const { mutate } = useMutation(
        async (title: string) =>
            await axios.post('/api/posts/addPost', { title }),
        {
            onError: (error) => {
                if(error instanceof AxiosError){
                    
                    toast.error(error?.response?.data.message, { id: toastPostID })
                }
                setIsDisabled(false)
            },
            onSuccess: (data) => {
                toast.success('Your confession has been made 😃', {id: toastPostID})
                queryClient.invalidateQueries(["posts"])
                setTitle("")
                setIsDisabled(false)
            }
        }
    )

    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        toastPostID = toast.loading("Creating your post", { id: toastPostID })
        mutate(title)
    }
    


    return (
        <form onSubmit={submitPost} className="bg-gray-800 border border-gray-700 my-6 p-6 rounded-lg ">
            <div className="flex flex-col my-2">
                <textarea
                    onChange={(e) => setTitle(e.target.value)}
                    name='title'
                    value={title}
                    placeholder="Feel free to confess..."
                    className="p-4 text-sm rounded-md my-2 bg-gray-200"
                >
                </textarea>
            </div>

            <div>
                <button
                    disabled={isDisabled}
                    className="text-sm font-medium bg-sky-400 text-gray-800 py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >
                    Post
                </button>
            </div>
        </form>
    )
}