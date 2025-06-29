'use client'
import { SessionProvider } from "next-auth/react"
import { ApiKeyProvider } from "../context/apiKeyContext"

export default function ClientSideLayout({
  children,
  session
}) {
  return (
    <SessionProvider session={session}>
      <ApiKeyProvider>
        {children}
      </ApiKeyProvider>
    </SessionProvider>
  )
}