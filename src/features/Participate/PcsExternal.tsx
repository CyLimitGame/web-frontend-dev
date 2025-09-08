import React from 'react';
import { Center, Flex, Icon } from '@chakra-ui/react';
import { PiLinkBold } from 'react-icons/pi';

type Props = {
  startListExternalUrl: string;
};

const PcsExternal = ({ startListExternalUrl }: Props) => {
  const handleOpenStartListExternalUrl = () => {
    startListExternalUrl && window.open(startListExternalUrl, '_blank');
  };

  return (
    <Center
      gap={2}
      border="1px solid"
      borderColor="border"
      p={3}
      borderRadius="xl"
      cursor="pointer"
      onClick={handleOpenStartListExternalUrl}
    >
      <Icon as={PiLinkBold} fontSize="2xl" />
      <Flex color="white" fontWeight="bold" fontStyle="normal" gap={1}>
        <Center boxSize="24px" bg="#e8706f">
          P
        </Center>
        <Center boxSize="24px" bg="#e8706f">
          C
        </Center>
        <Center boxSize="24px" bg="#3c617e">
          S
        </Center>
      </Flex>
    </Center>
  );
};

export default PcsExternal;
