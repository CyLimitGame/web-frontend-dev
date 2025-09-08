import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import LazyLoad from 'react-lazyload';

import MainLayout from '@/layouts/MainLayout';
import { BACKGROUND_PARTNERS, PARTNERS } from '@/constants/images';
import { Container, Text } from '@/components/Common';

const Partners = () => {
  return (
    <MainLayout isSpacingTop={false}>
      <Box pt={10}>
        <Box
          position="relative"
          bg="red"
          height={['200px', '200px', '300px', '400px']}
          bgColor={['#265d7c', '#265d7c', '#265d7c', 'transparent']}
          backgroundImage={[
            'none',
            'none',
            'none',
            `url("${BACKGROUND_PARTNERS}")`,
          ]}
          backgroundSize="cover"
        >
          <Text
            translateText="our_partners"
            color="white"
            fontWeight="bold"
            fontSize={['2xl', '2xl', '5xl']}
            position="absolute"
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
          />
        </Box>
        <Container mb={16} mt={[5, 5, 10]}>
          <LazyLoad>
            <Image src={PARTNERS} />
          </LazyLoad>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Partners;
