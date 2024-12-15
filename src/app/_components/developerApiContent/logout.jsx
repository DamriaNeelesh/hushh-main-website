import { Button } from "@chakra-ui/react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import '../../../../pages/fonts.css'

const LogoutButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }).then(() => {
        router.push("/developer-Api/about-developer-api"); 
    });
  };

  return (
    <div>
      {session ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button
          onClick={() =>
            signIn(
              "goolge",
              { callbackUrl: "/developer-Api/on-boarding" },
              console.log("Github session data :", session)
            )
          }
        >
          LogIn
        </button>
      )}
    </div>
  );
};

export default LogoutButton;
