import React from 'react';
import { Avatar, Box, Flex, Icon } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';
import { MdPerson } from 'react-icons/md';

import Image from 'next/image';

import { Text } from '@/components/Common';
import colors from '@/theme/foundations/colors';
// import {
//   TEAM_RANKING_1ST,
//   TEAM_RANKING_2ND,
//   TEAM_RANKING_3RD,
// } from '@/constants/images';
import { navigateTo } from '@/utils/navigation';
import { getFullName } from '@/utils/user';
import { formatPrice } from '@/utils/number';
import { PATH } from '@/constants/path';
import {
  GameRankingTeamsScore,
  RankingPackage,
  RewardJackpotLeague,
} from '@/typings/game';
import { FILTER_LIMIT } from '@/constants/filter';
import { useGetTemplateRule } from '@/queries/useGame';
import { BLUE_CARD, RED_CARD, YELLOW_CARD } from '@/constants/images';

type Props = {
  item: GameRankingTeamsScore;
  index: number;
  divisionId: string;
  page: number;
  highlight?: boolean;
  isMySelf?: boolean;
  gameId: string;
};

// type RankProps = {
//   order: number;
// };

// const Rank = ({ order }: RankProps) => {
//   switch (order) {
//     case 1:
//       return (
//         <Box width="50px">
//           <Image src={TEAM_RANKING_1ST} />
//         </Box>
//       );
//     case 2:
//       return (
//         <Box width="50px">
//           <Image src={TEAM_RANKING_2ND} />
//         </Box>
//       );
//     case 3:
//       return (
//         <Box width="50px">
//           <Image src={TEAM_RANKING_3RD} />
//         </Box>
//       );
//     default:
//       return (
//         <Text
//           fontWeight="bold"
//           color="gray.400"
//           fontSize="xl"
//           width="50px"
//           pl={2}
//         >
//           {order}
//         </Text>
//       );
//   }
// };

const MAP_RARITY = {
  blue: BLUE_CARD,
  pink: RED_CARD,
  yellow: YELLOW_CARD,
};

const UserItem = ({
  item,
  index,
  divisionId,
  page = 0,
  highlight,
  isMySelf,
  gameId,
}: Props) => {
  const { t } = useTranslation();

  const createdBy = _.get(item, 'createdBy', {});
  const avatarUrl = _.get(item, 'createdBy.avatarUrl', '');
  const totalPoint = _.get(item, 'totalPoint', 0);

  const { data: templateRule } = useGetTemplateRule(gameId);

  const rewardTemplateLeagues = _.get(templateRule, 'rewardTemplateLeagues');

  const rewardTemplateLeague = _.find(
    rewardTemplateLeagues,
    (item) => _.get(item, 'divisionId') === divisionId
  );

  const rankingPackages: RankingPackage[] = _.get(
    rewardTemplateLeague,
    'gameRewardTemplate.rankingPackages',
    []
  );

  const rankingPackage = _.find(
    rankingPackages,
    (item) => item.rankingFrom >= index
  );

  //JACKPOT
  const rewardJackpotLeagues: RewardJackpotLeague[] = _.get(
    templateRule,
    'rewardJackpotLeagues',
    []
  );

  const rewardJackpotLeague = _.find(
    rewardJackpotLeagues,
    (item) => _.get(item, 'divisionId') === divisionId
  );

  const getJackpotUscdReward = () => {
    if (rewardJackpotLeague?.scoreCondition === 'greater_than') {
      return totalPoint > _.get(rewardJackpotLeague, 'minScore', 0)
        ? rewardJackpotLeague.usdcReward
        : 0;
    }
    if (rewardJackpotLeague?.scoreCondition === 'greater_than_or_equal') {
      return totalPoint >= _.get(rewardJackpotLeague, 'minScore', 0)
        ? rewardJackpotLeague.usdcReward
        : 0;
    }
    return 0;
  };

  const jackpotUscdReward = getJackpotUscdReward();

  return (
    <Box
      px={[5, 5, 10, 20]}
      _hover={{ bg: 'primary.50' }}
      transition=".2s"
      cursor="pointer"
      onClick={() =>
        navigateTo(`${PATH.TEAM_SCORE}/${item.id}`, { league: divisionId })
      }
      bg={highlight ? 'primary.50' : 'transparent'}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`1px solid ${colors.gray[200]}`}
        className="user-item"
        py={4}
        pos="relative"
      >
        {isMySelf && (
          <Icon
            as={MdPerson}
            color="gray.400"
            pos="absolute"
            left={['-14px', '-14px', '-30px']}
            fontSize={['md', 'md', '3xl']}
          />
        )}
        <Flex alignItems="center">
          <Text
            fontWeight="bold"
            color="gray.400"
            fontSize="xl"
            width="50px"
            pl={2}
          >
            {page * FILTER_LIMIT + index}
          </Text>
          <Avatar
            src={avatarUrl}
            borderRadius="full"
            boxSize={['40px', '40px', '54px']}
          />
          <Text ml={[2, 2, 4]}>{getFullName(createdBy)}</Text>
        </Flex>
        <Box>
          <Text fontSize={['sm', 'md']} fontWeight="bold" color="primary.500">
            {t('points_total', { points: formatPrice(totalPoint) })}
          </Text>
          <Flex gap={2} justifyContent="end">
            {_.map(rankingPackage?.nftRewardTemplates, (item, index) => (
              <Image
                key={index}
                src={_.get(MAP_RARITY, item.rarity)}
                width="16px"
                height="20px"
              />
            ))}
            {_.get(rankingPackage, 'usdcReward', 0) > 0 && (
              <Text fontWeight="bold" fontSize="sm" color="gray.700">
                ${rankingPackage?.usdcReward}
              </Text>
            )}
            {jackpotUscdReward > 0 && (
              <Text fontWeight="bold" fontSize="sm" color="gray.700">
                ${jackpotUscdReward}
              </Text>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserItem;
