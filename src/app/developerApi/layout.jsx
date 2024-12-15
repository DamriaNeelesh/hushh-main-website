import { SessionProvider } from "next-auth/react"
import ClientSideLayout from "./clientSideLayout"
export default function RootLayout({
 children
}) {
  return (
    <ClientSideLayout >
      {children}
    </ClientSideLayout>
  )
}