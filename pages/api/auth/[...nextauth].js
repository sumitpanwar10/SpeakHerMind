import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../prisma/client'
import { v4 as uuidv4 } from 'uuid'

const adapter = PrismaAdapter(prisma)

export const authOptions ={
    adapter: PrismaAdapter(prisma),
    
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            secret: process.env.AUTH_SECRET,
            secret: process.env.NEXT_PUBLIC_SECRET,


            async callback({ token, account, user }) {
                console.log('Executing callback function')
                const anonymousId = `anonymous-${uuidv4().substr(0, 5)}`;
                // Update the user object with the anonymous ID
                user.anonymousId = anonymousId;
                console.log(anonymousId)
                console.log("ye rhi")
                // Update the user's information in the database
                await prisma.user.update({
                    where: { id: user.id },
                    data: { anonymousId },
                });
                return {
                    ...user,
                    session: {
                        ...user.session,
                        anonymousId,
                    },
                }
            }
        }),
    ],
    
    // callbacks: {
    //     async signIn(user, account, profile) {
    //         // Generate anonymousId
    //         const anonymousId = `anonymousId${Math.floor(Math.random() * 10000)}`

    //         // Create a new user with anonymousId
    //         const newUser = await prisma.user.create({
    //             data: {
    //                 name: profile.name,
    //                 email: profile.email,
    //                 image: profile.image,
    //                 anonymousId: anonymousId,
    //             },
    //         })

    //         return true
    //     },
    // },
}
export default NextAuth(authOptions)

// export default NextAuth({
//     adapter: PrismaAdapter(prisma),
//     secret: process.env.AUTH_SECRET,
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             // async callback({ token, account, user }) {
//             //     const anonymousId = uuidv4()
//             //     user.id = anonymousId
//             //     return {
//             //         ...user,
//             //         session: {
//             //             ...user.session,
//             //             anonymousId,
//             //         },
//             //     }
//             // }
//         }),
//     ],
    
    
// })


