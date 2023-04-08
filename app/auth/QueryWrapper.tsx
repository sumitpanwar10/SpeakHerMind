'use client'
import { Toaster} from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

interface Props {
    children?: ReactNode
}
const queryClient = new QueryClient

const QueryWrapper = ({children}: Props) => (
    <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
    </QueryClientProvider>
)

export default QueryWrapper