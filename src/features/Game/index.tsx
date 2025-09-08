import React from 'react';
import { Box, Divider } from '@chakra-ui/react';

import GameData from './GameData';
import GameFilter from './GameFilter';

import MainLayout from '@/layouts/MainLayout';
import { Container } from '@/components/Common';
import breakpoints from '@/theme/foundations/breakpoints';

const Game = () => {
  return (
    <MainLayout>
      <Container maxWidth={breakpoints['2xl']} pt={2}>
        <Box>
          <GameFilter />
          <GameData />
        </Box>
      </Container>
      <Divider mb={10} />
    </MainLayout>
  );
};

export default Game;
