import next from "next"
import Link from "next/link"
import Login from "./Login"
import Logged from "./Logged"
import { CgProfile } from "react-icons/cg"
import { getServerSession } from  "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
export default async function Nav() {
    const session = await getServerSession(authOptions)
    console.log(session)
    return(

    <nav className="flex justify-between items-center py-8">
        <Link href={"/"}>
                <h1 className="font-bold text-xl text-yellow-400">SpeakHerMind</h1>
        </Link>
        
        <div className="flex justify-center gap-6 items-center">
                <ul>
                    {!session?.user && <Login />}
                    {session?.user && <Logged />}

                </ul>
                <Link href={`/dashboard`} className="text-4xl text-yellow-400">
                    <CgProfile />
                </Link>
        </div>
    </nav>
    )
}