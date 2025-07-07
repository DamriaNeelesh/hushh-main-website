"use client";
import React, { useRef } from 'react';
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  HStack,
  VStack,
  useToast,
  Box,
} from '@chakra-ui/react';
import { FiUser, FiLogOut, FiMail } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const UserAvatar = () => {
  const { user, signOut } = useAuth();
  const toast = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "✅ Signed out successfully",
        description: "You have been signed out of your account.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign out error",
        description: "There was an error signing out. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (!user) return null;

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const userEmail = user.email;
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <Menu>
      <MenuButton>
        <Avatar
          size="sm"
          name={userName}
          src={avatarUrl}
          cursor="pointer"
          w="32px"
          h="32px"
          borderRadius="full"
          border="2px solid rgba(255, 255, 255, 0.2)"
          _hover={{
            transform: "scale(1.05)",
            borderColor: "rgba(255, 255, 255, 0.4)",
            boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.1)",
          }}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          bg="linear-gradient(135deg, #0071E3, #BB62FC)"
          color="white"
        />
      </MenuButton>
      
      <MenuList
        bg="#1a1a1a"
        border="1px solid rgba(255, 255, 255, 0.1)"
        borderRadius="xl"
        minW="280px"
        py={3}
        boxShadow="0 20px 40px rgba(0, 0, 0, 0.4)"
        backdropFilter="blur(20px)"
        zIndex={1500}
        mt={2}
      >
        {/* User Info */}
        <Box px={4} py={3}>
          <VStack spacing={2} align="start">
            <HStack spacing={3} w="full">
              <Avatar
                size="sm"
                name={userName}
                src={avatarUrl}
                w="40px"
                h="40px"
                bg="linear-gradient(135deg, #0071E3, #BB62FC)"
                color="white"
              />
              <VStack spacing={1} align="start" flex={1}>
                <Text
                  color="white"
                  fontWeight={600}
                  fontSize="sm"
                  noOfLines={1}
                  maxW="180px"
                >
                  {userName}
                </Text>
                <HStack spacing={2}>
                  <FiMail size={12} color="#888" />
                  <Text
                    color="#888"
                    fontSize="xs"
                    noOfLines={1}
                    maxW="160px"
                  >
                    {userEmail}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </Box>
        
        <MenuDivider borderColor="rgba(255, 255, 255, 0.1)" />
        
        {/* Menu Items */}
     
            
        <MenuItem
          icon={<FiLogOut />}
          bg="transparent"
          color="#FF6B6B"
          _hover={{
            bg: "rgba(255, 107, 107, 0.1)",
            color: "#FF8A8A",
          }}
          _focus={{
            bg: "rgba(255, 107, 107, 0.1)",
          }}
          fontSize="sm"
          py={3}
          px={4}
          onClick={handleSignOut}
          transition="all 0.2s"
        >
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserAvatar; 