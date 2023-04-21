'use client'

import Image from "next/image"
import { signOut } from 'next-auth/react'
import Link  from "next/link"

export default function Logged(){
    return(
        <li className="flex gap-8 items-center">
            <button 
                onClick={() => signOut()}
                className="text-sm bg-sky-400 font-medium py-2 px-6 rounded-xl disabled:opacity-25"
            >
                Sign Out
            </button>
        </li>
    )
}

