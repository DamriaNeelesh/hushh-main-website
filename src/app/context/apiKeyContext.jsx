'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the context
const ApiKeyContext = createContext();

// Provider component to manage API key state
export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load API key from localStorage on mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('hushh_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  // Save API key to both state and localStorage
  const saveApiKey = (newApiKey) => {
    setApiKey(newApiKey);
    localStorage.setItem('hushh_api_key', newApiKey);
  };

  // Clear API key from both state and localStorage
  const clearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('hushh_api_key');
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
