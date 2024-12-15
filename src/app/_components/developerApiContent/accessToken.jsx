'use client'
import React, { useState, useContext, useRef } from "react";
import { useApiKey } from "../../context/apiKeyContext";
import axios from "axios";
import { useSession } from "next-auth/react";
// import { getSession } from 'next-auth/react'
import { useToast } from "@chakra-ui/react";
import ApiKeyContext from '../../context/apiKeyContext';
import '../../../../pages/fonts.css'

const AccessToken = () => {
  const { apiKey } = useApiKey();
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const toast =  useToast();
  const [copySuccess, setCopySuccess] = useState('Copy');
  const textAreaRef = useRef(null);
 
  const { data: session, status } = useSession()
  console.log('Session from GetSession Client', session?.session?.user?.email);
  console.log('Whole Session Data: ',session)
  console.log('Api Key: ', apiKey)

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };


  const generateToken = async (e) => {
    setIsLoading(true)
    console.log('button clicked upr wala')
    e.preventDefault();

    if(!session?.session?.user){
      toast({
        title: "Please Login First",
        description:
          "To get started with Acess Token you need to first login/signup",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false)
    }

      try {
        const response = await axios.post(
          "https://developer-api-53407187172.us-central1.run.app/login",
          {
            email: session?.token?.email,
            first_name: session?.token?.name,
            password: session?.token?.sub
          },          
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setAccessToken(response.data.data.access_token)
        console.log("Access Token Generated:", response.data.data.access_token);

        if(response?.data?.status === 2){
          toast({
            title: "User not available",
            description:
              "Please log in and then try again later",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
        }

        if (response?.data?.status === 1) {
          // Saving API key for new users 
          const accessToken = response?.data?.data?.access_token;
          console.log('Access Token:',response?.data?.data?.access_token)
          setAccessToken(accessToken);
          setIsLoading(false);
          toast({
            title: "Access Token Granted",
            description:
              "You have successfully generated access token",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } 
      } catch (error) {
        toast({
          title: "Something went wrong",
          description:
            "Please try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
  };

  return (
    <div
      class=" shadow-sm text-white mt-8 onBoarding"
      data-v0-t="card"
    >
      <button
        onClick={generateToken}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-[#bd1e59] hover:bg-[#a11648] mt-4"
      >
        {isLoading ? "Generating... Please wait" : "Generate Access Token"} {/* Show loading text */}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      <div
        class="border text-card-foreground shadow-sm bg-[#1C1C1E] mt-4 p-4 flex items-center justify-between rounded"
        data-v0-t="card"
      >
        <input
          class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-none text-white placeholder-gray-400"
          placeholder="Authorization: Bearer YOUR_API_KEY"
          value={accessToken}
          readOnly
          ref={textAreaRef} 
        />
        <button 
          onClick={copyToClipboard}
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-none bg-[#313134] text-gray-300 ml-3">
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
  );
};

AccessToken.getInitialProps = async (context) => {
  const session = await getSession(context);

  return {
    session
  }
}

export default AccessToken