'use client'
import { Toaster} from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "react-query"
import React, { ReactNode } from "react"

interface Props {
    children?: ReactNode
}
const queryClient = new QueryClient();

const QueryWrapper = ({children}: Props) => (
    <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
    </QueryClientProvider>
)

export default QueryWrapper