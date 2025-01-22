'use client'
import React, { useState, useEffect } from 'react';
import config from '../config/config';
import { httpRequest } from '../requestHandler/requestHandler';
import { useToast } from '@chakra-ui/react';

const SessionToken = () => {
  const [session, setSession] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  // Fetch user's API key from Supabase
  const fetchApiKey = async () => {
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
        console.error('Error fetching API key:', error);
        setError('Failed to fetch API key');
      } else {
        setApiKey(data.api_key);
      }
    } catch (err) {
      console.error('Error fetching API key:', err);
      setError('Failed to fetch API key');
    }
  };

  // Call the session token API
  const fetchSessionToken = async () => {
    if (!session?.user?.email || !apiKey) {
      setError('User email or API key is missing');
      toast({
        title: 'Missing Information',
        description: 'User email or API key is required to fetch session token.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await httpRequest(
        'POST',
        `sessiontoken?mail=${session.user.email}&api_key=${apiKey}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status_code === 200) {
        setSessionToken(response.token);
        toast({
          title: 'Session Token Retrieved',
          description: 'Your session token has been successfully retrieved.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setError('Failed to fetch session token');
      }
    } catch (error) {
      console.error('Error fetching session token:', error);
      setError('Failed to fetch session token');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchApiKey(); // Fetch the API key when the session is available
    }
  }, [session]);

  return (
    <div className="shadow-sm text-white mt-8 onBoarding">
      <button
        onClick={fetchSessionToken}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-[#bd1e59] hover:bg-[#a11648] mt-4"
        disabled={isLoading || !apiKey}
      >
        {isLoading ? 'Processing...' : 'Get Session Token'}
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="border text-card-foreground shadow-sm bg-[#1C1C1E] mt-4 p-4 flex items-center justify-between rounded">
        <input
          className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-none text-white placeholder-gray-400"
          placeholder="Please click on the button above to get your session token "
          value={sessionToken}
          readOnly
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(sessionToken);
            toast({
              title: 'Copied to Clipboard',
              description: 'Session token has been copied to clipboard.',
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
          }}
          className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-none bg-[#313134] text-gray-300 ml-3"
          disabled={!sessionToken}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default SessionToken;
