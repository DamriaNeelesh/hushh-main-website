import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  AspectRatio,
  Box,
  Button
} from "@chakra-ui/react";

const HushhVideoModal = ({ isOpen, onClose }) => {
  const [unmuted, setUnmuted] = useState(false);

  const handleUnmute = () => {
    setUnmuted(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent p={0} borderRadius="md" overflow="hidden"
      h={{ base: "auto", md: "80vh" }}
      w={{ base: "90vw", md: "45vh" }}
      mx="auto"
      >
        {/* <ModalCloseButton color="white" /> */}
        <ModalBody p={0}>
            <video
              autoPlay
              muted={!unmuted}
              playsInline
              onEnded={onClose}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                display: "block",
              }}
            >
              <source
                src="/video/User_Story_Ad_Final_4K_trimmed.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          {/* Minimal overlay to allow unmuting */}
          {!unmuted && (
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              display="flex"
              alignItems="center"
              justifyContent="center"
              pointerEvents="none"
            >
              <Button
                onClick={handleUnmute}
                pointerEvents="all"
                opacity={0.8}
                bg="blackAlpha.600"
                color="white"
                borderRadius="full"
                _hover={{ opacity: 1 }}
              >
                Unmute
              </Button>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HushhVideoModal;
