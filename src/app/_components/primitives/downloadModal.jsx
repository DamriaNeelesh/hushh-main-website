import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, Text } from '@chakra-ui/react';
import { isAndroid, isIOS, isMobile } from 'react-device-detect';
import Image from 'next/image';
// import UnicodeQR from '../svg/onelinkQrdownload.svg';
// import UnicodeQR from '../svg/hushhWalletQR.svg';
import UnicodeQR from '../svg/HushhWalletApp-2.svg';

const DownloadModal = ({ isOpen, onClose }) => {
  
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={{ base: '4', md: '0' }}>
        <ModalHeader>
          {!isMobile ? (
            <Text>Please Scan QR Code to Download App</Text>
          ) : (
            <Text>Choose Your Build</Text>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          {isAndroid ? (
            <>
              <Button
                onClick={() => window.location.href = "https://bit.ly/hushh-wallet-android-dev"}
                colorScheme="blue" width="100%">
                Hushh Wallet (APK) - Test Build
              </Button>
              <Button
                onClick={() => window.location.href = "https://bit.ly/hushh-wallet-play-store"}
                colorScheme="green" width="100%" mt={2}>
                Hushh Wallet - Play Store (Production)
              </Button>
            </>
          ) : isIOS ? (
            <>
              <Button
                onClick={() => window.location.href = "https://bit.ly/hushh-wallet-ios-dev"}
                colorScheme="blue" width="100%">
                Hushh Wallet (iOS) - Test Build
              </Button>
              <Button
                onClick={() => window.location.href = "https://bit.ly/hushh-app-ios"}
                colorScheme="green" width="100%" mt={2}>
                Hushh Wallet - App Store (Production)
              </Button>
            </>
          ) : (
            <>
              <Image src={UnicodeQR} size={256} alt="QR Code" style={{ width: '80%', height: '80%' }} />
              <Text fontSize={'1.75rem'} fontWeight={'bold'} className="hushh-gradient">Hushh Wallet App</Text>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DownloadModal;