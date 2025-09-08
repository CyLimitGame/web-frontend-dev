import React from 'react';
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import _ from 'lodash';
import { MdOutlineArrowDownward } from 'react-icons/md';
import Link from 'next/link';

import { DataGrid, Text } from '@/components/Common';
import { CardItem as CardItemProps } from '@/typings/card';
import League1Icon from '@/icons/MyTeam/League1';
import League4Icon from '@/icons/MyTeam/League4';
import League3Icon from '@/icons/MyTeam/League3';
import League2Icon from '@/icons/MyTeam/League2';
import { BaseCard } from '@/features/core/Cards';
import { MarketType } from '@/typings/card.enum';
import { getTemplatePath } from '@/utils/string';
import { PATH } from '@/constants/path';

type Props = {
  data: CardItemProps[];
  isLoading: boolean;
};

const ListByRarity = ({ cards, title, icon }: any) => {
  const { isOpen, onToggle } = useDisclosure();
  const column = useBreakpointValue({ base: 3, xs: 3, sm: 4, md: 6, lg: 7 });

  if (_.isEmpty(cards)) {
    return null;
  }

  return (
    <Flex gap={2} direction={['column', 'column', 'row']}>
      <Box flex={1}>
        <DataGrid
          columns={column}
          gap={[2, 2, 4]}
          data={isOpen ? cards : _.take(cards, column)}
          renderItem={(item) => (
            <Link
              href={getTemplatePath(PATH.CARD_DETAILS, { id: item.id })}
              passHref
            >
              <Box as="a" cursor="pointer">
                <BaseCard
                  data={item}
                  isShowPrice={item.marketType === MarketType.FIXED}
                />
              </Box>
            </Link>
          )}
        />
      </Box>
      <Flex
        direction={['row', 'row', 'column']}
        justifyContent={['space-between', 'space-between', 'start']}
        alignItems="center"
        px={1}
        pt={[4, 4, 10]}
        width={['auto', 'auto', 'auto', '150px']}
        order={[-1, -1, 1]}
      >
        <Flex alignItems="center" gap={2}>
          <Icon as={icon} fontSize="2xl" />
          <Text fontWeight="bold" fontSize="xl">
            {title}
          </Text>
        </Flex>
        <IconButton
          isRound={true}
          aria-label="down"
          fontSize="2xl"
          bg="white"
          color="gray.900"
          icon={<MdOutlineArrowDownward />}
          mt={2}
          onClick={onToggle}
          transform={`rotate(${isOpen ? 180 : 0}deg)`}
        />
      </Flex>
    </Flex>
  );
};

const CardData = ({ data }: Props) => {
  const whiteCards = _.filter(data, (item) =>
    ['white', 'na'].includes(item.rarity)
  );
  const blueCards = _.filter(data, (item) => item.rarity === 'blue');
  const pinkCards = _.filter(data, (item) => item.rarity === 'pink');
  const yellowCards = _.filter(data, (item) => item.rarity === 'yellow');

  const getData = (list: any) => {
    return _.orderBy(list, 'capScore.averageCapScore', 'desc');
  };

  return (
    <Stack gap={10}>
      <ListByRarity
        cards={getData(whiteCards)}
        title="League 4"
        icon={League4Icon}
      />
      <ListByRarity
        cards={getData(blueCards)}
        title="League 3"
        icon={League3Icon}
      />
      <ListByRarity
        cards={getData(pinkCards)}
        title="League 2"
        icon={League2Icon}
      />
      <ListByRarity
        cards={getData(yellowCards)}
        title="League 1"
        icon={League1Icon}
      />
    </Stack>
  );
};

export default CardData;
