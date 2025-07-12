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
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiUser, FiLogOut, FiMail, FiSettings, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const UserAvatar = () => {
  const { user, signOut } = useAuth();
  const toast = useToast();
  const router = useRouter();

  // Apple-inspired color values
  const menuBg = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(30, 30, 30, 0.95)');
  const menuBorder = useColorModeValue('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.08)');
  const textPrimary = useColorModeValue('#1D1D1F', '#F5F5F7');
  const textSecondary = useColorModeValue('#6E6E73', '#86868B');
  const itemHoverBg = useColorModeValue('rgba(0, 0, 0, 0.04)', 'rgba(255, 255, 255, 0.08)');
  const avatarBg = useColorModeValue('linear-gradient(135deg, #007AFF, #5E5CE6)', 'linear-gradient(135deg, #007AFF, #5E5CE6)');

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
      router.push('/');
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

  const handleProfileClick = () => {
    router.push('/user-profile');
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
          w="34px"
          h="34px"
          borderRadius="full"
          border="2px solid rgba(255, 255, 255, 0.9)"
          _hover={{
            transform: "scale(1.08)",
            borderColor: "rgba(255, 255, 255, 1)",
            boxShadow: "0 4px 20px rgba(0, 122, 255, 0.25), 0 0 0 3px rgba(255, 255, 255, 0.1)",
          }}
          transition="all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          bg={avatarBg}
          color="white"
          fontWeight="500"
          fontSize="sm"
          boxShadow="0 2px 8px rgba(0, 0, 0, 0.15)"
        />
      </MenuButton>
      
      <MenuList
        bg={menuBg}
        border={`1px solid ${menuBorder}`}
        borderRadius="16px"
        minW="320px"
        py={0}
        boxShadow="0 10px 40px rgba(0, 0, 0, 0.12), 0 4px 20px rgba(0, 0, 0, 0.08)"
        backdropFilter="blur(20px) saturate(180%)"
        zIndex={1500}
        mt={3}
        overflow="hidden"
      >
        {/* User Info Header */}
        <Box px={5} py={4} bg="transparent">
          <VStack spacing={3} align="start">
            <HStack spacing={4} w="full">
              <Avatar
                size="md"
                name={userName}
                src={avatarUrl}
                w="48px"
                h="48px"
                bg={avatarBg}
                color="white"
                fontWeight="500"
                fontSize="lg"
                boxShadow="0 2px 8px rgba(0, 0, 0, 0.15)"
              />
              <VStack spacing={1} align="start" flex={1}>
                <Text
                  color={textPrimary}
                  fontWeight={600}
                  fontSize="17px"
                  noOfLines={1}
                  maxW="220px"
                  lineHeight="1.2"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {userName}
                </Text>
                <HStack spacing={2}>
                  <Icon as={FiMail} size="14px" color={textSecondary} />
                  <Text
                    color={textSecondary}
                    fontSize="13px"
                    noOfLines={1}
                    maxW="200px"
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  >
                    {userEmail}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </Box>
        
        <MenuDivider borderColor={menuBorder} opacity={0.6} />
        
        {/* Menu Items */}
        <Box py={1}>
          <MenuItem 
            // icon={<FiUser size="16px" />}
            bg="transparent"
            color={textPrimary}
            _hover={{
              bg: itemHoverBg,
              color: textPrimary,
            }}
            _focus={{
              bg: itemHoverBg,
            }}
            fontSize="15px"
            fontWeight="400"
            py={3}
            px={5}
            onClick={handleProfileClick}
            transition="all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            justifyContent="space-between"
          >
            <HStack spacing={3}>
              <Icon as={FiUser} size="16px" />
              <Text>View Profile</Text>
            </HStack>
            <Icon as={FiChevronRight} size="14px" color={textSecondary} />
          </MenuItem>
          
          <MenuItem 
            // icon={<FiSettings size="16px" />}
            bg="transparent"
            color={textPrimary}
            _hover={{
              bg: itemHoverBg,
              color: textPrimary,
            }}
            _focus={{
              bg: itemHoverBg,
            }}
            fontSize="15px"
            fontWeight="400"
            py={3}
            px={5}
            onClick={() => router.push('/contact-us')}
            transition="all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            justifyContent="space-between"
          >
            <HStack spacing={3}>
              <Icon as={FiMail} size="16px" />
              <Text>Contact Us</Text>
            </HStack>
            <Icon as={FiChevronRight} size="14px" color={textSecondary} />
          </MenuItem>
          
          <MenuDivider borderColor={menuBorder} opacity={0.6} my={1} />
          
          <MenuItem
            // icon={<FiLogOut size="16px" />}
            bg="transparent"
            color="#FF3B30"
            _hover={{
              bg: "rgba(255, 59, 48, 0.08)",
              color: "#FF3B30",
            }}
            _focus={{
              bg: "rgba(255, 59, 48, 0.08)",
            }}
            fontSize="15px"
            fontWeight="400"
            py={3}
            px={5}
            onClick={handleSignOut}
            transition="all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            justifyContent="space-between"
          >
            <HStack spacing={3}>
              <Icon as={FiLogOut} size="16px" />
              <Text>Sign Out</Text>
            </HStack>
          </MenuItem>
        </Box>
      </MenuList>
    </Menu>
  );
};

export default UserAvatar; 