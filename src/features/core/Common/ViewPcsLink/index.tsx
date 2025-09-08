import { Center, Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { PiLinkBold } from 'react-icons/pi';

const ViewPcsLink = () => {
  return (
    <Flex gap={2} cursor="pointer" display="inline-flex">
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
    </Flex>
  );
};

export default ViewPcsLink;
