import React from 'react';
import { Box } from '@chakra-ui/react';

import RuleItem from './RuleItem';

import { MainLayout } from '@/layouts';
import { Breadcrumbs, Container, Text } from '@/components/Common';
import { RuleItem as RuleItemProps } from '@/typings/rule';
import { RULE_BREADCRUMB } from '@/constants/breadcrumbs';

// TODO: Mock will remove when implement API
const RULES: RuleItemProps[] = [
  {
    id: '1',
    index: 1,
    title: '1 GC rider (or 1 domestic who will score as a GC rider)',
  },
  {
    id: '2',
    index: 2,
    title: '1 Climber (or 1 domestic who will score as a Climber)',
  },
  {
    id: '3',
    index: 3,
    title: '1 Spinter (or 1 domestic who will score as a Sprinter)',
  },
  {
    id: '4',
    index: 4,
    title: '1 Domestic (who will score as a Free Electron)',
  },
  {
    id: '5',
    index: 5,
    title: '1 Domestic (who will score as a Domestic)',
  },
];

const Rules = () => {
  return (
    <MainLayout>
      <Container maxWidth={1200} pt={5}>
        <Breadcrumbs data={RULE_BREADCRUMB} />
        <Text
          translateText="rules"
          fontWeight="bold"
          fontSize="4xl"
          color="gray.900"
          mt={2}
        />
        <Text
          translateText="only_cards_of_blue_rarity"
          color="primary.500"
          fontSize="lg"
          fontWeight="bold"
          mt={6}
        />
        <Text
          translateText="riders_maximum"
          color="primary.500"
          fontSize="lg"
          fontWeight="bold"
        />
        <Text
          translateText="team_composition"
          color="gray.900"
          fontSize="lg"
          fontWeight="bold"
          mt={4}
        />
        <Box mb={8}>
          {RULES.map((item) => (
            <RuleItem item={item} key={item.id} />
          ))}
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Rules;
