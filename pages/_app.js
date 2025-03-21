import React from "react";
import ClientSideLayout from "./client";
import { SessionProvider } from "next-auth/react";
import { ApiKeyProvider } from "../src/app/context/apiKeyContext";
import './globals.css';
import { Figtree } from 'next/font/google';

const figtree = Figtree({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    display: 'swap',
  });

export default function MyApp({ Component, pageProps }) {
    return <ClientSideLayout>
        <SessionProvider>
            <ApiKeyProvider>
            <div className={figtree.className}>
        <Component {...pageProps}/>
        </div>
        </ApiKeyProvider>
        </SessionProvider>
        </ClientSideLayout>
}
