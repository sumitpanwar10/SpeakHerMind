import './globals.css'
import Nav from './auth/Nav'
import QueryWrapper from './auth/QueryWrapper'
import '@fontsource/roboto/latin-ext-500.css'



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`mx-4 text-lg md:mx-48 xl:mx-85 font-medium font-sans bg-gray-900`} style={{ fontFamily: 'Roboto, sans-serif' }}>

        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
