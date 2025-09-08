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
import { useRouter } from 'next/router';

import { DataGrid, Text } from '@/components/Common';
import { CardItem as CardItemProps } from '@/typings/card';
import League1Icon from '@/icons/MyTeam/League1';
import League4Icon from '@/icons/MyTeam/League4';
import League3Icon from '@/icons/MyTeam/League3';
import League2Icon from '@/icons/MyTeam/League2';
import { navigateToCard } from '@/utils/navigation';
import { BaseCard } from '@/features/core/Cards';

type Props = {
  data: CardItemProps[];
  isLoading: boolean;
};

const ListByRarity = ({ cards, title, icon }: any) => {
  const router = useRouter();
  const isSale = _.get(router, 'query.isSale', 'false') === 'true';

  const { isOpen, onToggle } = useDisclosure();
  const column = useBreakpointValue({ base: 2, xs: 2, sm: 4, md: 6, lg: 7 });

  if (_.isEmpty(cards)) {
    return null;
  }

  return (
    <Flex gap={2}>
      <Box flex={1}>
        <DataGrid
          columns={column}
          gap={[2, 2, 4]}
          data={isOpen ? cards : _.take(cards, column)}
          renderItem={(item) => (
            <BaseCard
              cursor="pointer"
              onClick={() => navigateToCard(item?.id)}
              data={item}
              isShowPrice={isSale}
            />
          )}
        />
      </Box>
      <Flex
        direction="column"
        alignItems="center"
        px={1}
        pt={10}
        width={['auto', 'auto', 'auto', '150px']}
      >
        <Flex alignItems="center" gap={2}>
          <Icon as={icon} fontSize="2xl" />
          <Text
            fontWeight="bold"
            fontSize="xl"
            display={['none', 'none', 'none', 'block']}
          >
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
