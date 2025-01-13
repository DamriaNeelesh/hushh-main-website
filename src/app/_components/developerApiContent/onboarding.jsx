"use client";
import React, { useState, useContext, useRef, useEffect } from "react";
import { useApiKey } from "../../context/apiKeyContext";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
// import { getSession } from 'next-auth/react'
import { Button, Text, useToast, VStack } from "@chakra-ui/react";
import '../../../../pages/fonts.css'
import authentication from "../authentication/authentication";
import config from "../config/config";

const Onboarding = () => {
  // const { apiKey } = useApiKey();
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session, token } = useSession()
  const [copySuccess, setCopySuccess] = useState('Copy');
  const textAreaRef = useRef(null);
  const toast = useToast();
  
  useEffect(() => {
    async function handlePostSignIn() {
      try {
        console.log('Fetching the authenticated user...');

        // Fetch the authenticated user's session
        const { data, error } = await config.supabaseClient.auth.getUser();

        if (error) {
          console.error('Error fetching authenticated user:', error.message);
          return;
        }

        const user = data.user;
        if (user) {
          console.log('User fetched successfully:', user);

          // Extract user data to be inserted
          const userData = {
            // user_id: user.id,
            mail: user.email,
            firstname: user.user_metadata?.full_name || null,
            lastname: user.user_metadata?.full_name || null,
            purpose:'Testing developer api onboarding',
            password:user.user_metadata?.sub || null
          };
          console.log('Data to be inserted:', userData);

          // Insert or update the user data into the 'dev_api_userprofile' table
          const { error: upsertError } = await config.supabaseClient
            .from('dev_api_userprofile')
            .upsert([userData], { onConflict: 'mail' });

          if (upsertError) {
            console.error('Error inserting user data:', upsertError.message);
          } else {
            console.log('User data inserted successfully');
          }
        }
      } catch (error) {
        console.error('Unexpected error during post-sign-in handling:', error);
      }
    }

    handlePostSignIn();
  }, []);

  // async function fetchUserData() {
  //   try {
  //     // Fetch all rows from the 'dev_api_userprofile' table
  //     const { data, error } = await config.supabaseClient
  //       .from('dev_api_userprofile')
  //       .select('*'); // Select all columns
  
  //     if (error) {
  //       console.error('Error fetching user data:', error.message);
  //       return;
  //     }
  
  //     if (data) {
  //       console.log('Fetched user data:', data);
  //     }
  //   } catch (error) {
  //     console.error('Unexpected error while fetching user data:', error);
  //   }
  // }

  
  console.log('Session from GetSession Client', session?.session?.user?.email);
  console.log('Whole Session Data: ',session)

  const handleGoogleSignIn = async () => {
    try {
      await authentication.googleSignIn();
      console.log("Google sign-in successful");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await authentication.appleSignIn();
      console.log("Apple sign-in successful");
    } catch (error) {
      console.error("Apple sign-in error:", error);
    }
  };

  // useEffect(() => {
  //   // Fetch data immediately on component mount
  //   fetchUserData();

  //   // Set up an interval to fetch data every 5 minutes (300000 milliseconds)
  //   const intervalId = setInterval(() => {
  //     fetchUserData();
  //   }, 3000);

  //   return () => clearInterval(intervalId);
  // }, []);
  
  const generateApiKey = async (e) => {
    console.log('button clicked upr wala')
    setIsLoading(true)
    if(!session?.session?.user){
      toast({
        title: "Please Login First",
        description:
          "To get started with API key you need to first login/signup",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false)
    }

    e.preventDefault();
      try {
        console.log(response);
        const response = await axios.post(
          "https://developer-api-53407187172.us-central1.run.app/login",
          {
            mail: session?.token?.email,
            first_name: session?.token?.name,
            password: session?.token?.sub
          },          
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const apiKey = response?.data?.data?.API_key

        console.log(response);
        console.log("API Key Generated:", response);
        if (response?.data?.message === 'Success') {
          console.log("API Key Generated:", response);

          // Saving API key for new users 
          const apiKey = response?.data?.data?.API_key
          setApiKey(apiKey);
          console.log('Api key:',apiKey);
          toast({
            title: "API Key Generated",
            description:
              "You have successfully accessed api key",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
        } 
      } catch (error) {
        console.log("API Key Generated:", response);
        toast({
          title: "Something went wrong",
          description:
            "Please log in or try again later",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        console.log('error:',error);
        console.log('Api Key:',response?.data?.userdata?.apiKey)
      }
      
  };

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };

  return (
    <>
    <VStack spacing={4}>
      <Text fontSize="lg" fontWeight="bold">
        Sign in to access the Developer API
      </Text>
      <Button onClick={handleGoogleSignIn} colorScheme="blue">
        Sign in with Google
      </Button>
      <Button onClick={handleAppleSignIn} colorScheme="blackAlpha">
        Sign in with Apple
      </Button>
    </VStack>
    <div
      class=" shadow-sm text-white mt-8 onBoarding"
      data-v0-t="card"
    >
      <button
        onClick={generateApiKey}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-[#bd1e59] hover:bg-[#a11648] mt-4"
      >
        {isLoading ? "Generating..." : "Generate API Key"} {/* Show loading text */}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      <div
        class="border text-card-foreground shadow-sm bg-[#1C1C1E] mt-4 p-4 flex items-center justify-between rounded"
        data-v0-t="card"
      >
        <input
          class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-none text-white placeholder-gray-400"
          placeholder="Authorization: Bearer YOUR_API_KEY"
          value={apiKey}
          readOnly
        />
        <button 
          onClick={copyToClipboard}
          class="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-none bg-[#313134] text-gray-300 ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4"
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

Onboarding.getInitialProps = async (context) => {
  const session = await getSession(context);

  return {
    session
  }
}

export default Onboarding