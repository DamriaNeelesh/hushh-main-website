"use client"
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

const YouTubeModal = ({ isOpen, onClose, videoId, title }) => {
  return (
    <Modal isOpen={isOpen} style={{borderRadius:'20px'}} onClose={onClose} size="2xl" bg={'#121212'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader style={{backgroundColor:'#121212'}} color={'white'}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{backgroundColor:'#121212'}}>
          <iframe
            width="100%"
            height="315"
            
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </ModalBody>
        <ModalFooter style={{backgroundColor:'#121212'}}>
          <Button _hover={{backgroundColor:'#121212'}} className='gradient' color={'white'} mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default YouTubeModal;