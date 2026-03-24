import { ApiKeyProvider } from "../context/apiKeyContext";

export default function ClientSideLayout({
  children,
  session: _session
}) {
  return (
    <ApiKeyProvider>
      {children}
    </ApiKeyProvider>);

}