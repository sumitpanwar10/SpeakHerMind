import './globals.css'
import Nav from './auth/Nav'
import { Roboto } from "@next/font/google"
import QueryWrapper from './auth/QueryWrapper'

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`mx-4 text-lg md:mx-48 xl:mx-96 font-medium ${roboto.variable} font-sans bg-gray-900`}>
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
