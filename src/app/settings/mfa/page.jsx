"use client";
import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    VStack,
    HStack,
    Text,
    Container,
    Divider,
    useToast,
    Spinner,
    Badge,
    Card,
    CardBody,
    Heading,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon, WarningIcon, LockIcon } from '@chakra-ui/icons';
import ContentWrapper from '../../_components/layout/ContentWrapper';

const MFASettingsPage = () => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const toast = useToast();
    const [isLoadingFactors, setIsLoadingFactors] = useState(true);
    const [factors, setFactors] = useState([]);
    const [isRemoving, setIsRemoving] = useState(false);
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login?redirect=/settings/mfa');
        }
    }, [isAuthenticated, loading, router]);

    const loadMFAFactors = useCallback(async () => {
        setIsLoadingFactors(true);
        setFactors([]);
        setIsLoadingFactors(false);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            loadMFAFactors();
        }
    }, [isAuthenticated, loadMFAFactors]);

    const handleRemoveMFA = async (_factorId) => {
        setIsRemoving(true);
        toast({
            title: 'MFA unavailable',
            description: 'Two-factor authentication is not enabled on the website deployment yet.',
            status: 'info',
            duration: 4000,
            isClosable: true,
            position: 'top',
        });
        setIsRemoving(false);
    };
    if (loading || !isAuthenticated) {
        return (
            <Box minH="100vh" bg="#ffffff" display="flex" alignItems="center" justifyContent="center">
                <VStack spacing={6}>
                    <Spinner size="xl" color="#171b29" thickness="4px" />
                    <Text color="#1d1d1f" fontSize="lg" fontWeight={500}>
                        Loading...
                    </Text>
                </VStack>
            </Box>
        );
    }

    const verifiedFactors = factors.filter(f => f.status === 'verified');
    const hasMFA = verifiedFactors.length > 0;

    return (
        <ContentWrapper includeHeaderSpacing={true}>
            <Container maxW="container.md" py={12}>
                <VStack spacing={8} align="stretch">
                    {/* Header */}
                    <VStack spacing={4} align="start">
                        <HStack spacing={3}>
                            <Box fontSize="3xl">🔐</Box>
                            <Heading size="xl" color="#1d1d1f" fontWeight={800}>
                                Two-Factor Authentication
                            </Heading>
                        </HStack>
                        <Text color="#6e6e73" fontSize="lg">
                            Add an extra layer of security to your account by requiring a verification code in addition to your password.
                        </Text>
                    </VStack>

                    {/* Status Card */}
                    <Card
                        borderRadius="2xl"
                        border="1px solid"
                        borderColor={hasMFA ? "#34C759" : "#FF9500"}
                        bg={hasMFA ? "#f0fdf4" : "#fff9e6"}
                        boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
                    >
                        <CardBody p={6}>
                            <HStack spacing={4} align="start">
                                {hasMFA ? (
                                    <CheckCircleIcon color="#34C759" fontSize="2xl" />
                                ) : (
                                    <WarningIcon color="#FF9500" fontSize="2xl" />
                                )}
                                <VStack align="start" spacing={2} flex={1}>
                                    <HStack>
                                        <Text fontSize="xl" fontWeight={700} color="#1d1d1f">
                                            {hasMFA ? 'MFA Enabled' : 'MFA Not Enabled'}
                                        </Text>
                                        <Badge
                                            colorScheme={hasMFA ? 'green' : 'orange'}
                                            fontSize="sm"
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                        >
                                            {hasMFA ? 'Protected' : 'Vulnerable'}
                                        </Badge>
                                    </HStack>
                                    <Text color="#6e6e73" fontSize="md">
                                        {hasMFA
                                            ? 'Your account is protected with two-factor authentication'
                                            : 'Enable MFA to secure your account with an additional verification step'}
                                    </Text>
                                </VStack>
                            </HStack>
                        </CardBody>
                    </Card>

                    {/* MFA Factors */}
                    {isLoadingFactors ? (
                        <Box py={8} textAlign="center">
                            <Spinner size="lg" color="#171b29" />
                        </Box>
                    ) : (
                        <VStack spacing={4} align="stretch">
                            {verifiedFactors.length > 0 ? (
                                <>
                                    <Text fontSize="lg" fontWeight={700} color="#1d1d1f">
                                        Active Authenticators
                                    </Text>
                                    {verifiedFactors.map((factor) => (
                                        <Card
                                            key={factor.id}
                                            borderRadius="xl"
                                            border="1px solid #e5e5ea"
                                            bg="#ffffff"
                                            boxShadow="0 2px 8px rgba(0, 0, 0, 0.04)"
                                        >
                                            <CardBody p={5}>
                                                <HStack justify="space-between">
                                                    <HStack spacing={4}>
                                                        <Box
                                                            w="48px"
                                                            h="48px"
                                                            borderRadius="xl"
                                                            bg="#f5f5f7"
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                        >
                                                            <LockIcon color="#171b29" fontSize="xl" />
                                                        </Box>
                                                        <VStack align="start" spacing={1}>
                                                            <Text fontSize="md" fontWeight={700} color="#1d1d1f">
                                                                {factor.friendly_name || 'Authenticator App'}
                                                            </Text>
                                                            <Text fontSize="sm" color="#6e6e73">
                                                                TOTP • Created {new Date(factor.created_at).toLocaleDateString()}
                                                            </Text>
                                                        </VStack>
                                                    </HStack>
                                                    <Button
                                                        size="sm"
                                                        colorScheme="red"
                                                        variant="outline"
                                                        onClick={() => handleRemoveMFA(factor.id)}
                                                        isLoading={isRemoving}
                                                        borderRadius="lg"
                                                    >
                                                        Remove
                                                    </Button>
                                                </HStack>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </>
                            ) : (
                                <Alert
                                    status="info"
                                    borderRadius="xl"
                                    bg="#f0f9ff"
                                    border="1px solid #bfdbfe"
                                >
                                    <AlertIcon color="#171b29" />
                                    <Box>
                                        <AlertTitle color="#1d1d1f" fontSize="md">
                                            No Authenticators Configured
                                        </AlertTitle>
                                        <AlertDescription color="#6e6e73" fontSize="sm">
                                            Website sign-in now uses shared Firebase identity, but MFA is not exposed on this deployment yet
                                        </AlertDescription>
                                    </Box>
                                </Alert>
                            )}
                        </VStack>
                    )}

                    <Divider />

                    {/* Actions */}
                    <VStack spacing={4} align="stretch">
                        {!hasMFA && (
                            <Alert
                                status="info"
                                borderRadius="xl"
                                bg="#f8f6f0"
                                border="1px solid rgba(23, 27, 41, 0.08)"
                            >
                                <AlertIcon color="#171b29" />
                                <Box>
                                    <AlertTitle color="#1d1d1f" fontSize="md">
                                        MFA not exposed on the website
                                    </AlertTitle>
                                    <AlertDescription color="#6e6e73" fontSize="sm">
                                        Shared Firebase sign-in is active, but MFA enrollment remains outside the website flow for now.
                                    </AlertDescription>
                                </Box>
                            </Alert>
                        )}

                        {/* Security Tips */}
                        <Card
                            borderRadius="xl"
                            border="1px solid #e5e5ea"
                            bg="#f5f5f7"
                        >
                            <CardBody p={5}>
                                <VStack align="start" spacing={3}>
                                    <Text fontSize="md" fontWeight={700} color="#1d1d1f">
                                        💡 Security Tips
                                    </Text>
                                    <VStack align="start" spacing={2} pl={4}>
                                        <Text fontSize="sm" color="#6e6e73">
                                            • Use apps like Google Authenticator, Microsoft Authenticator, or Authy
                                        </Text>
                                        <Text fontSize="sm" color="#6e6e73">
                                            • Keep your authenticator app updated
                                        </Text>
                                        <Text fontSize="sm" color="#6e6e73">
                                            • Store backup codes in a secure location
                                        </Text>
                                        <Text fontSize="sm" color="#6e6e73">
                                            • Never share your verification codes with anyone
                                        </Text>
                                    </VStack>
                                </VStack>
                            </CardBody>
                        </Card>
                    </VStack>
                </VStack>
            </Container>
        </ContentWrapper>
    );
};

export default MFASettingsPage;
