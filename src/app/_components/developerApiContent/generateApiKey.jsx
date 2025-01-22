import React, { useState, useEffect } from 'react';
import { httpRequest } from '../requestHandler/requestHandler';
import config from '../config/config';
import { useToast } from '@chakra-ui/react';

const GenerateApiKey = () => {
  const [hasApiKey, setHasApiKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [session, setSession] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // Get the current session
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check if the user already has an API key
  const checkApiKeyStatus = async () => {
    if (!session?.user?.email) {
      setError('User email is not available');
      return;
    }

    try {
      const { data, error } = await config.supabaseClient
        .from('dev_api_userprofile')
        .select('api_key')
        .eq('mail', session.user.email)
        .single();

      if (error) {
        console.error('Error checking API key status:', error);
        setError('Failed to check API key status');
      } else {
        // If api_key is present, set `hasApiKey` to true
        setHasApiKey(!!data?.api_key);
      }
    } catch (err) {
      console.error('Error checking API key status:', err);
      setError('Failed to check API key status');
    }
  };

  const handleGenerateApiKey = async () => {
    if (!session?.user?.email) {
      setError('User email is not available');
      toast({
        title: 'Please Login First',
        description: 'To get started with an API key, you need to first login/signup',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await httpRequest('POST', `generateapikey?mail=${session.user.email}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status_code === 200) {
        setApiKey(response.api_key); // Set the API key
        toast({
          title: 'API Key Generated',
          description: 'Your API key has been successfully generated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setHasApiKey(true); // Update status after key generation
      } else {
        setError('Failed to generate API key');
      }
    } catch (error) {
      setError('Failed to generate API key');
      console.error('Error generating API key:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleGetApiKey = async () => {
    if (!session?.user?.email) {
      setError('User email is not available');
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await httpRequest('GET', `getapikey?mail=${session.user.email}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status_code === 200) {
        setApiKey(response.data); // Set the API key
        setError('');
      } else {
        setError('Failed to retrieve API key');
      }
    } catch (error) {
      setError('Failed to retrieve API key');
      console.error('Error retrieving API key:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    if (session) {
      // Check if the user already has an API key
      checkApiKeyStatus();
    }
  }, [session]);

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopySuccess('Copied!');
      toast({
        title: 'Copied to Clipboard',
        description: 'API key has been copied to clipboard.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div className="shadow-sm text-white mt-8 onBoarding" data-v0-t="card">
        {hasApiKey !== null && (
          <button
            onClick={hasApiKey ? handleGetApiKey : handleGenerateApiKey}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-[#bd1e59] hover:bg-[#a11648] mt-4"
          >
            {isLoading
              ? 'Processing...'
              : hasApiKey
              ? 'Get API Key'
              : 'Generate New API Key'}
          </button>
        )}
        {error && <div className="text-red-500">{error}</div>}
        <div className="border text-card-foreground shadow-sm bg-[#1C1C1E] mt-4 p-4 flex items-center justify-between rounded" data-v0-t="card">
          <input
            className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-none text-white placeholder-gray-400"
            placeholder="Authorization: Bearer YOUR_API_KEY"
            value={apiKey}
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-none bg-[#313134] text-gray-300 ml-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            </svg>
            {copySuccess}
          </button>
        </div>
      </div>
    </>
  );
};

export default GenerateApiKey;
