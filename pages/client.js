'use client'
import { SessionProvider } from "next-auth/react"
import FooterComponent from "../src/app/_components/features/FooterComponent"
import { ChakraProvider } from "@chakra-ui/react"
import { ApiKeyProvider } from "../src/app/context/apiKeyContext"

export default function ClientSideLayout({
  children,
  session
}) {
  return (
    <>
    <ChakraProvider>
    <SessionProvider session={session}>
      <ApiKeyProvider>
      {children}
      </ApiKeyProvider>
    </SessionProvider>
    </ChakraProvider>
    <FooterComponent></FooterComponent>
    </>
  )
}