import React from 'react';
import { Flex, Image } from '@chakra-ui/react';

import { MANY_MORE_ATHLETES } from '@/constants/images';

const GetYourOwnNft = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      shadow="smBlue"
      bg="white"
      borderRadius="2xl"
      p={4}
      display="inline-flex"
      mt={10}
    >
      <Image src={MANY_MORE_ATHLETES} w="320px" />
    </Flex>
  );
};

export default GetYourOwnNft;
