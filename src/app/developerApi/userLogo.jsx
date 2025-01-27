'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Button, Avatar, Menu, MenuButton, MenuList, MenuItem, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import config from "../_components/config/config";
import HushhLogo from "../_components/svg/hushhLogoS.svg";

const MyLogo = () => {
  const [session, setSession] = useState(null);
  const router = useRouter();
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

  const handleLogout = async () => {
    try {
      await config.supabaseClient.auth.signOut();
      setSession(null);
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

  const handleLogin = () => {
    router.push("/developerApi/login");
  };

  return (
    <Box display="flex" alignItems="center">
      {session ? (
        <Menu>
          <MenuButton as={Button} variant="link">
            <Avatar src={session.user.user_metadata.avatar_url} name={session.user.email} />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Text fontWeight="bold">{session.user.user_metadata.full_name}</Text>
            </MenuItem>
            <MenuItem>
              <Text>{session.user.email}</Text>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Box display="flex" alignItems="center" flexDirection={'row'} gap={{md:'2rem',base:'0'}}>
          <Image src={HushhLogo} alt="Hushh Logo" width={34} height={34} />
          <Button
            border="1px solid #606060"
            borderRadius="2px"
            p={4}
            style={{ color: "var(--button-text-color)" }}
            background="transparent"
            onClick={handleLogin}
            _hover={{
              background: 'linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)'
            }}
          >
            Log In
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MyLogo;