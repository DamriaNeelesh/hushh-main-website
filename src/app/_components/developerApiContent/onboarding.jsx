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
  // const { data: session, token } = useSession()
  const [copySuccess, setCopySuccess] = useState('Copy');
  const textAreaRef = useRef(null);
  const toast = useToast();
  const [session, setSession] = useState(null)
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Get the current session
    config.supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        toast({
          title: "Thank you for signing up!",
          description: `Welcome back, ${session.user.email}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = config.supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
          user_id: user?.id || null ,
          mail: user.user_metadata?.email || null,
          firstname: user.user_metadata?.full_name || null,
          lastname: user.user_metadata?.full_name || null,
          password: user.user_metadata?.sub || null,
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

  if (session) {
    handlePostSignIn();
  }
}, [session]);


  
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
      // await config.supabaseClient.auth.signInWithOAuth({
      //   provider: "apple",
      //   options: {
      //     redirectTo: config.redirect_url,
      //   },
      // });
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

  const handleLogout = async () => {
    try {
      await config.supabaseClient.auth.signOut();
      setSession(null); // Clear the session state
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
  function generateRandomString(length = 16) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  }

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
  //   script.type = "text/javascript";
  //   script.async = true;
  //   script.onload = () => {
  //     // Initialize AppleID.auth after the script is loaded
  //     AppleID.auth.init({
  //       // clientId: 'com.hushh.ai.siwa.sid',
  //       clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
  //       scope: 'email name',
  //       // redirectURI: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI,
  //       redirectURI: "https://rpmzykoxqnbozgdoqbpc.supabase.co/auth/v1/callback",
  //       state: generateRandomString(), // Function to generate a random string
  //       nonce:  generateRandomString(),
  //       usePopup: true,
  //     });
  //   };
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <>
    <VStack spacing={4}>
      
        {session && (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <Text fontSize="lg" fontFamily={'Inter ,sans-serif'} fontWeight="500" color="green.500">
        Thank you for signing up, {session.user.email}
      </Text>
      <Button onClick={handleLogout} colorScheme="red" size="sm">
        Logout
      </Button>
    </div>
  )}
      </VStack>
    
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