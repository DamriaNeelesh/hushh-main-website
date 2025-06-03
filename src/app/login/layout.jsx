import React from 'react';
import ClientProvider from './ClientProvider';

export const metadata = {
  title: "Login | Hushh",
  description: "Login to your Hushh account to access personalized experiences and control your data",
  openGraph: {
    title: "Login | Hushh",
    description: "Login to your Hushh account to access personalized experiences and control your data",
    images: [
      {
        url: "https://www.hushh.ai/Images/bg-image-login.png",
        width: 1200,
        height: 630,
        alt: "Hushh Login",
      },
    ],
  },
};

export default function LoginLayout({ children }) {
  return (
    <ClientProvider>
      {children}
    </ClientProvider>
  );
} 