import { PrismaClient } from "@prisma/client" // 38.1k(gzipped: 14.6k)

const client = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV !== "production")globalThis.prisma = client

export default client