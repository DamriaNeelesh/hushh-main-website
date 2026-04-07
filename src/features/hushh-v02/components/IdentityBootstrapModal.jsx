"use client";

import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function IdentityBootstrapModal({
  isOpen,
  onClose,
  defaultName,
  defaultEmail,
  status,
  error,
  onSubmit,
}) {
  const [name, setName] = useState(defaultName || "");
  const [email, setEmail] = useState(defaultEmail || "");

  useEffect(() => {
    setName(defaultName || "");
  }, [defaultName]);

  useEffect(() => {
    setEmail(defaultEmail || "");
  }, [defaultEmail]);

  const busy = status === "requesting-location";

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({ name, email });
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={busy ? () => undefined : onClose} size="lg">
      <ModalOverlay bg="rgba(10, 20, 35, 0.42)" backdropFilter="blur(12px)" />
      <ModalContent
        borderRadius={{ base: "24px", md: "28px" }}
        overflow="hidden"
        mx={{ base: 3, md: 0 }}
        my={{ base: 3, md: 6 }}
      >
        <ModalHeader pb={1} fontSize={{ base: "2xl", md: "3xl" }}>
          Unlock Hushh Intelligence
        </ModalHeader>
        <ModalCloseButton disabled={busy} />
        <ModalBody pb={{ base: 6, md: 8 }} pt={{ base: 2, md: 3 }}>
          <VStack align="stretch" as="form" spacing={{ base: 4, md: 5 }} onSubmit={handleSubmit}>
            <Text color="#5b6470" fontSize="sm" lineHeight="1.7">
              Before search starts, Hushh needs your consented identity context: your name, your email, and
              live location permission from this device.
            </Text>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="#191c1d">
                Name
              </FormLabel>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ankit Kumar Singh"
                borderRadius="16px"
                size="lg"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" color="#191c1d">
                Email
              </FormLabel>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                type="email"
                borderRadius="16px"
                size="lg"
              />
            </FormControl>

            <Text color="#7c8591" fontSize="sm" lineHeight="1.7">
              Tap continue and your browser will open the native location-permission prompt. Once you allow
              it, this card closes and Hushh starts researching your public footprint in the background.
            </Text>

            {error ? (
              <Text color="#ba1a1a" fontSize="sm">
                {error}
              </Text>
            ) : null}

            <Button
              type="submit"
              isLoading={busy}
              loadingText="Waiting for location access"
              borderRadius="999px"
              colorScheme="blue"
              size="lg"
              width="full"
            >
              Allow Location And Start Research
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
