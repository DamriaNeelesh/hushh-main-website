import React from "react";
import ClientSideLayout from "./client";
import { SessionProvider } from "next-auth/react";
import { ApiKeyProvider } from "../src/app/context/apiKeyContext";

export default function MyApp({ Component, pageProps }) {
    return <ClientSideLayout>
        <SessionProvider>
            <ApiKeyProvider>
            
        <Component {...pageProps}/>
        </ApiKeyProvider>
        </SessionProvider>
        </ClientSideLayout>
}
