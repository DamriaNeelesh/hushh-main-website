'use client'
import React, { createContext, useContext, useState } from 'react';

// Define the context
const ApiKeyContext = createContext();

// Provider component to manage API key state
export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Keep API keys in memory only to avoid persistent client-side secret storage.
  const saveApiKey = (newApiKey) => {
    setApiKey(newApiKey);
  };

  // Clear API key from in-memory state.
  const clearApiKey = () => {
    setApiKey('');
  };

  // Check if API key exists
  const hasApiKey = () => {
    return apiKey && apiKey.trim() !== '';
  };

  const value = {
    apiKey,
    isLoading,
    setIsLoading,
    saveApiKey,
    clearApiKey,
    hasApiKey,
  };

  return (
    <ApiKeyContext.Provider value={value}>
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
