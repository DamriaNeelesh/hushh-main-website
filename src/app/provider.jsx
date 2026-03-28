"use client";
import extendedTheme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import EmotionCacheProvider from "./emotion-cache-provider";

export function Providers({ children }) {
  return (
    <EmotionCacheProvider>
      <ChakraProvider
        theme={extendedTheme}
        toastOptions={{
          defaultOptions: {
            position: "top",
            containerStyle: {
              zIndex: 9000,
              marginTop: "calc(env(safe-area-inset-top, 0px) + 7rem)",
            },
          },
        }}
      >
        {children}
      </ChakraProvider>
    </EmotionCacheProvider>
  );
}
