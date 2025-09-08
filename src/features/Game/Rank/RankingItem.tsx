import { useState } from 'react';
import { Box, Collapse, Flex, useDisclosure, Icon } from '@chakra-ui/react';
import _ from 'lodash';
import { useMutation } from 'react-query';

import { MdKeyboardArrowDown } from 'react-icons/md';

import { CardItem } from '@/typings/card';
import { GameRankingTeamsScore } from '@/typings/game';
import { CardRole, RarityWithStar } from '@/features/core/Common';
import {
  AvgCapScoreAndBonus,
  Captain,
  CardImageLoader,
  Circle,
  DataGrid,
  JerseyWithSponsor,
  LoaderOverlay,
  Text,
} from '@/components/Common';
import { formatPrice } from '@/utils/number';
import { fixedNumber } from '@/utils/common';
import { getAvgCapScoreAndBonus } from '@/apis';
import { getCardImage } from '@/utils/string';
import { Jersey, Sponsor } from '@/typings/user.enum';

type RankingItemProps = {
  item: GameRankingTeamsScore;
  index: number;
  isAcquired: boolean;
  onClickScore: (values: any) => void;
};

const RankingItem = ({
  item,
  index,
  isAcquired,
  onClickScore,
}: RankingItemProps) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const { isOpen, onToggle } = useDisclosure();
  const createdBy = _.get(item, 'createdBy', {});

  const gameReward = _.get(item, 'gameReward');
  const jackpotReward = _.get(gameReward, 'jackpotReward', 0);
  const nftRewardTemplates: any = _.get(gameReward, 'nftRewardTemplates', []);
  const usdcRewards = _.sumBy(_.get(gameReward, 'usdcRewards', []), 'value');
  const results = isAcquired
    ? _.get(item, 'acquiredResults', [])
    : _.get(item, 'results', []);
  const totalPoint = _.sumBy(results, 'point');

  const { mutateAsync, isLoading } = useMutation(getAvgCapScoreAndBonus);

  const handleFirstToggle = async () => {
    if (_.size(cards)) {
      onToggle();
      return;
    }

    const naCards = _.map(_.get(item, 'naCards', []), (elm: any) => ({
      ...elm,
      rarity: 'trainee',
    }));

    const nfts = _.map(_.get(item, 'nfts', []), (elm: any) => ({
      ...elm,
    }));

    const result = await mutateAsync({
      items: [...naCards, ...nfts],
      gameTeamId: item.id,
    });
    setCards(result);
    onToggle();
  };

  const cardIds = [
    ..._.get(item, 'nftIds', []),
    ..._.get(item, 'naCardIds', []),
  ];

  const getRole = (id: string) => {
    const findCard = _.find(cardIds, (card) => _.get(card, 'id') === id);
    return _.get(findCard, 'role', '');
  };

  const renderReward = () => {
    return (
      <>
        <Flex flex={1} gap={2} fontWeight="bold" justifyContent="center">
          {_.size(nftRewardTemplates)
            ? _.map(nftRewardTemplates, (nft, index) => (
                <RarityWithStar
                  rarity={nft.rarity}
                  star={nft.riderStar}
                  key={index}
                />
              ))
            : ''}
        </Flex>
      </>
    );
  };

  const renderCash = () => {
    return (
      <Flex justifyContent="center" gap={10} w="100%">
        {usdcRewards > 0 && (
          <Text fontWeight="bold">{`$${formatPrice(usdcRewards)}`}</Text>
        )}
        {jackpotReward > 0 && (
          <Text fontWeight="bold" color="yellow.300">
            {`$${formatPrice(jackpotReward)}`}
          </Text>
        )}
      </Flex>
    );
  };

  return (
    <LoaderOverlay isLoading={isLoading} borderRadius="xl">
      <Box border="1px solid white" borderRadius="xl" overflow="hidden">
        <Flex
          justifyContent="space-between"
          cursor="pointer"
          _hover={{ bg: 'input' }}
          userSelect="none"
          onClick={handleFirstToggle}
          p={2}
        >
          <Text fontWeight="bold" w="50px" textAlign="center">
            {index + 1}
          </Text>
          <Box flex={1}>
            <Flex
              gap={2}
              bg="input"
              py={2}
              px={4}
              borderRadius="4xl"
              display="inline-flex"
              fontSize={['xs', 'xs', 'md']}
            >
              <Text fontWeight="bold" textTransform="uppercase">
                {_.get(createdBy, 'nickName', '')}
              </Text>
              <JerseyWithSponsor
                jersey={_.get(createdBy, 'jersey', '') as Jersey}
                sponsor={_.get(createdBy, 'sponsor', '') as Sponsor}
                secondaryColor={_.get(createdBy, 'secondaryColor')}
                primaryColor={_.get(createdBy, 'primaryColor')}
                fontSize="20px"
              />
            </Flex>
          </Box>
          <Flex
            flex={1}
            display={['none', 'none', 'flex']}
            justifyContent="center"
          >
            {renderReward()}
          </Flex>
          <Flex flex={1} display={['none', 'none', 'flex']}>
            {renderCash()}
          </Flex>
          <Text w="60px" fontWeight="bold" textAlign="center">
            {fixedNumber(totalPoint, 0)}
          </Text>
          <Flex w="50px" justifyContent="end">
            <Icon
              fontSize="2xl"
              as={MdKeyboardArrowDown}
              transform={`rotate(${isOpen ? 180 : 0}deg)`}
            />
          </Flex>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Flex p={2} display={['flex', 'flex', 'none']}>
            {renderReward()}
          </Flex>
          <Flex display={['flex', 'flex', 'none']}>{renderCash()}</Flex>
          <Box p={[2, 2, 4]} maxW="600px" mx="auto">
            <DataGrid
              data={cards}
              gap={2}
              columns={[3, 3, 5]}
              renderItem={(card) => {
                const point = _.get(
                  _.find(results, (result) => result.id === card.id),
                  'point',
                  0
                );
                const isCaptain = _.get(item, 'captainId', '') === card.id;
                return (
                  <Box key={card.id}>
                    <CardRole
                      role={getRole(card.id)}
                      roles={cardIds}
                      fontSize="xs"
                    />
                    <Box pos="relative">
                      {isCaptain && <Captain />}
                      <CardImageLoader src={getCardImage(card)} key={card.id} />
                      <Box mt={2}>
                        <Flex gap={1} justifyContent="center">
                          <Circle
                            cursor="pointer"
                            _hover={{ opacity: 0.5 }}
                            onClick={() =>
                              point ? onClickScore(card) : undefined
                            }
                            fontSize="10px"
                            boxSize="20px"
                          >
                            {fixedNumber(point, 0)}
                          </Circle>
                          <AvgCapScoreAndBonus
                            item={card}
                            isShowAvg={false}
                            fontSize="xs"
                          />
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                );
              }}
            />
          </Box>
        </Collapse>
      </Box>
    </LoaderOverlay>
  );
};

export default RankingItem;
