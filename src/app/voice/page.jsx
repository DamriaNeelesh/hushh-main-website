"use client";
import { useEffect, useState } from "react";

export default function VoicePage() {
  const [countdown, setCountdown] = useState(3);
  const redirectUrl = "https://hushhvoice-2.onrender.com/";

  useEffect(() => {
    // Immediate redirect attempt
    const immediateRedirect = () => {
      try {
        window.location.href = redirectUrl;
      } catch (error) {
        console.error('Immediate redirect failed:', error);
      }
    };

    // Backup redirect with countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Fallback redirect methods
          try {
            window.location.replace(redirectUrl);
          } catch {
            try {
              window.open(redirectUrl, '_self');
            } catch (fallbackError) {
              console.error('All redirect methods failed:', fallbackError);
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Try immediate redirect after a short delay to ensure page is loaded
    const immediateTimer = setTimeout(immediateRedirect, 100);

    return () => {
      clearInterval(timer);
      clearTimeout(immediateTimer);
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#ffffff_0%,#f8f6f1_100%)]">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-b-4 border-[#171b29]"></div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Redirecting to Hushh Voice...
        </h1>
        
        <p className="text-gray-600 mb-4">
          Taking you to your private, consent-first AI copilot
        </p>
        
        {countdown > 0 && (
          <div className="mb-6">
            <p className="text-lg font-semibold text-[#8f8570]">
              Redirecting in {countdown} seconds...
            </p>
          </div>
        )}
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            If you&apos;re not redirected automatically:
          </p>
          
          <a 
            href={redirectUrl}
            className="inline-block rounded-full bg-[#171b29] px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-[#0f1422] hover:shadow-xl"
            target="_self"
            rel="noopener noreferrer"
          >
            Continue to Hushh Voice
          </a>
          
          <p className="text-xs text-gray-400 mt-4">
            {redirectUrl}
          </p>
        </div>
      </div>
    </div>
  );
}
