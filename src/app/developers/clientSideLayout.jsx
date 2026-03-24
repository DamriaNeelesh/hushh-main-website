import { ApiKeyProvider } from "../context/apiKeyContext"

export default function ClientSideLayout({
  children
}) {
  return (
    <ApiKeyProvider>
      {children}
    </ApiKeyProvider>
  )
}
