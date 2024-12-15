import React, { createContext, useState, useContext } from "react";

// Define the context
const ApiKeyContext = createContext(null);

// Provider component to manage API key state
export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState("");

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

// Custom hook to use the context
export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
};
