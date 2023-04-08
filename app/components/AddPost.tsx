'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from 'react-hot-toast'

export default function CreatePost() {
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)

    //creating post
    const { mutate } = useMutation(
        async (title: string) =>
            await axios.post('/api/posts/addPost', { title }),
        {
            onError: (error) => {
                console.log(error)
                toast.error(error?.response?.data.message)
            },
            onSuccess: (data) => {
                console.log(data)
                setTitle("")
                setIsDisabled(false)
            }
        }
    )

    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        mutate(title)
    }
    


    return (
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea
                    onChange={(e) => setTitle(e.target.value)}
                    name='title'
                    value={title}
                    placeholder="Feel free to confess..."
                    className="p-4 text-lg rounded-md my-2 bg-gray-200"
                >
                </textarea>
            </div>

            <div>
                <button
                    disabled={isDisabled}
                    className="txt-sm bg-sky-400 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type="submit"
                >Post</button>
            </div>
        </form>
    )
}