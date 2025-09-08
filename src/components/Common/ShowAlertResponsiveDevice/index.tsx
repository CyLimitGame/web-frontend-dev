import React, { useEffect } from 'react';
import { useMediaQuery } from '@chakra-ui/media-query';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react';

const ShowAlertResponsiveDevice = () => {
  const [isLessThan1024] = useMediaQuery('(max-width: 1024px)');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isLessThan1024) {
      onOpen();
    }
  }, [isLessThan1024]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Alert</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign="center" fontSize="lg">
            Currently, we do not support screens smaller than 1024px. We
            recommend you to go to the web version
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShowAlertResponsiveDevice;
