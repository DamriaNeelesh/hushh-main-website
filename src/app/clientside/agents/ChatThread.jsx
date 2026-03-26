'use client'
import React, { useEffect, useRef } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Spinner,
  Tag,
  usePrefersReducedMotion,
  Icon,
} from '@chakra-ui/react'
import Image from 'next/image'
import HushhLogoS from '../../_components/svg/hushhLogoS.svg'
import { FiAlertTriangle, FiMessageCircle } from 'react-icons/fi'
import { SafeMessageContent } from '../../_components/content/SafeMessageContent'

export default function ChatThread({ messages, loading, error, userInitials }) {
  const listRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!listRef.current) return
    const behavior = prefersReducedMotion ? 'auto' : 'smooth'
    listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior })
  }, [messages, loading, prefersReducedMotion])

  return (
    <Box
      ref={listRef}
      bg="white"
      borderRadius={{ base: '16px', md: '18px' }}
      borderWidth="1px"
      borderColor="gray.100"
      p={{ base: 4, md: 5 }}
      h="100%"
      overflowY="auto"
      aria-live="polite"
      shadow="xl"
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f5f9',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#cbd5f5',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#94a3b8',
        },
      }}
    >
      <VStack align="stretch" spacing={{ base: 4, md: 5 }}>
        {messages.length === 0 && !loading && (
          <VStack spacing={3} py={{ base: 8, md: 10 }} color="gray.500">
            <Icon as={FiMessageCircle} boxSize={8} opacity={0.5} />
            <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="600">
              Start by sending a message
            </Text>
            <Text fontSize={{ base: 'xs', md: 'sm' }} maxW="sm" textAlign="center">
              Use one of the curated prompts or type your own question to see agent responses here.
            </Text>
          </VStack>
        )}
        {messages.map((m) => (
          <HStack key={m.id} align="flex-start" spacing={{ base: 3, md: 4 }} w="100%">
            {m.role === 'user' ? (
              <Box
                w={{ base: 9, md: 10 }}
                h={{ base: 9, md: 10 }}
                minW={{ base: 9, md: 10 }}
                borderRadius="full"
                bg="gray.900"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="700"
                fontSize="sm"
              >
                {userInitials}
              </Box>
            ) : (
              <Box
                w={{ base: 9, md: 10 }}
                h={{ base: 9, md: 10 }}
                minW={{ base: 9, md: 10 }}
                borderRadius="full"
                overflow="hidden"
                bg="gray.900"
              >
                <Image src={HushhLogoS} alt="Hushh Agent" width={40} height={40} />
              </Box>
            )}
            <Box
              flex="1"
              bg={m.role === 'user' ? 'rgba(23, 27, 41, 0.04)' : 'rgba(143, 133, 112, 0.08)'}
              borderWidth="1px"
              borderColor={m.role === 'user' ? 'rgba(23, 27, 41, 0.12)' : 'rgba(143, 133, 112, 0.2)'}
              borderRadius={{ base: '18px', md: '20px' }}
              px={{ base: 4, md: 5 }}
              py={{ base: 3, md: 4 }}
              maxW="100%"
              overflow="hidden"
            >
              <Text
                fontSize="xs"
                color="gray.500"
                mb={2}
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                {m.role === 'user'
                  ? 'You'
                  : m.agent === 'hushh'
                    ? 'Hushh Agent'
                    : m.agent === 'hushh-profile'
                      ? 'Supabase Profile Creation Agent'
                      : m.agent === 'hushh-profile-update'
                        ? 'Supabase Profile Update Agent'
                        : m.agent === 'brand'
                          ? 'Brand Agent'
                          : m.agent === 'public'
                            ? 'Public Data Agent'
                            : m.agent === 'gemini'
                              ? 'Gemini Agent'
                              : m.agent === 'whatsapp'
                                ? 'WhatsApp Agent'
                                : m.agent === 'email'
                                  ? 'Email Agent'
                                  : 'Agent'}
              </Text>
              <Tag
                size="sm"
                variant="subtle"
                bg={m.role === 'user' ? 'rgba(23, 27, 41, 0.08)' : 'rgba(143, 133, 112, 0.16)'}
                color="#171b29"
                borderRadius="full"
                mb={3}
                w="fit-content"
              >
                {m.role === 'user' ? 'Prompt' : 'Response'}
              </Tag>
              <Box
                lineHeight={{ base: '1.65', md: '1.75' }}
                fontSize={{ base: 'sm', md: 'sm' }}
                color="gray.900"
                wordBreak="break-word"
                sx={{
                  a: {
                    color: '#171b29',
                    textDecoration: 'underline',
                    wordBreak: 'break-word',
                  },
                  'a:hover': {
                    color: '#8f8570',
                  },
                  ul: {
                    paddingInlineStart: '1.25rem',
                    marginBottom: '0.75rem',
                  },
                  ol: {
                    paddingInlineStart: '1.25rem',
                    marginBottom: '0.75rem',
                  },
                  'p:not(:last-of-type)': {
                    marginBottom: '0.75rem',
                  },
                  li: {
                    marginBottom: '0.35rem',
                  },
                }}
              >
                <SafeMessageContent content={m.content || ''} />
              </Box>
            </Box>
          </HStack>
        ))}
        {loading && (
          <HStack align="center" spacing={{ base: 3, md: 4 }}>
            <Box
              w={{ base: 9, md: 10 }}
              h={{ base: 9, md: 10 }}
              minW={{ base: 9, md: 10 }}
              borderRadius="full"
              overflow="hidden"
              bg="gray.900"
            >
              <Image src={HushhLogoS} alt="Hushh Agent" width={40} height={40} />
            </Box>
            <HStack
              bg="rgba(143, 133, 112, 0.12)"
              borderWidth="1px"
              borderColor="rgba(143, 133, 112, 0.22)"
              borderRadius="18px"
              px={{ base: 4, md: 5 }}
              py={{ base: 3, md: 4 }}
            >
              <Spinner size="sm" color="gray.900" />
              <Text color="gray.600" fontSize={{ base: 'xs', md: 'sm' }}>
                Waiting for agent…
              </Text>
            </HStack>
          </HStack>
        )}
        {error && !loading && (
          <HStack
            spacing={3}
            bg="rgba(248, 113, 113, 0.12)"
            border="1px solid rgba(248, 113, 113, 0.3)"
            borderRadius="16px"
            px={{ base: 4, md: 5 }}
            py={{ base: 3, md: 3 }}
          >
            <Icon as={FiAlertTriangle} color="red.500" />
            <Text color="red.600" fontSize={{ base: 'sm', md: 'sm' }}>
              {error}
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  )
}
