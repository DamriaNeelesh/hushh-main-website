import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signOut, useSession, signIn } from "next-auth/react";
import HushhLogo from "../_components/svg/hushhLogoS.svg";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const MyLogo = () => {
  const { data: session, status } = useSession();
  const userImage = session?.session?.user?.image;
  console.log("Session from MyLogo component", session);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
  };

  const handleLogin = async () => {
    router.push("/developerApi/login")
  }

  return (
    <>
      <Box gap={"1.5rem"} display={"flex"} flexDirection={"row"}>
        
        {session ? (
          <>
          <Image
          loader={() => userImage}
          src={userImage}
          alt="User Image"
          width={44}
          height={34}
        />
          <Button
            border={"1px solid #606060"}
            borderRadius="2px"
            background="transparent"
            style={{ color: "var(--button-text-color)" }}
            p={4}
            onClick={handleLogout}
            _hover={{
              background: 'linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)'
            }}
          >
            Logout
          </Button>
          </>
        ) : (
          <>
          <Image src={HushhLogo} alt="hushhLogo" width={34} height={34} />
          <Button
            border={"1px solid #606060"}
            borderRadius="2px"
            p={4}
            style={{ color: "var(--button-text-color)" }}
            background="transparent"
            onClick={handleLogin}
            _hover={{
              background: 'linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)'
            }}
          >
            LogIn
          </Button>
          </> 
        )}
      </Box>
    </>
  );
};

export default MyLogo;
