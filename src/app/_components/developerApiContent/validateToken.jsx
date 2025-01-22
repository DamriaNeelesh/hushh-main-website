'use client';

import React, { useState, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { httpRequest } from '../requestHandler/requestHandler';

const ValidateToken = () => {
  const [sessionToken, setSessionToken] = useState('');
  const [validationStatus, setValidationStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  const handleValidateToken = async () => {
    if (!sessionToken) {
      toast({
        title: 'No Session Token',
        description: 'Please provide a valid session token to validate.',
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
        `validatetoken?token=${sessionToken}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const message = response.msg || 'Operation completed.'; // Default message if 'msg' is not present

      if (response.status_code === 200) {
        setValidationStatus('Valid');
        toast({
          title: 'Success',
          description: message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setValidationStatus('Invalid');
        toast({
          title: 'Invalid Token',
          description: message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      setError('Failed to validate token');
      console.error('Error validating token:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while validating the token.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-sm text-white mt-8 onBoarding" data-v0-t="card">
      <div className="mb-4">
        <input
          className="flex h-10 w-full rounded-md border border-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent text-black placeholder-gray-400"
          placeholder="Enter your session token"
          value={sessionToken}
          onChange={(e) => setSessionToken(e.target.value)}
        />
      </div>

      <button
        onClick={handleValidateToken}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-[#bd1e59] hover:bg-[#a11648] mt-4"
        disabled={isLoading || !sessionToken}
      >
        {isLoading ? 'Validating...' : 'Validate Token'}
      </button>
      {/* {error && <div className="text-red-500 mt-4">{error}</div>} */}
      {validationStatus && (
        <div
          className={`mt-4 ${
            validationStatus === 'Valid' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {validationStatus === 'Valid'
            ? 'Token is valid!'
            : 'Token is invalid.'}
        </div>
      )}
    </div>
  );
};

export default ValidateToken;