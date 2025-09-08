import {
  Avatar,
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import _ from 'lodash';
import Image from 'next/image';
import { MdPerson } from 'react-icons/md';
import { useTranslation } from 'next-i18next';

import { GameRankingTeamsScore, RewardJackpotLeague } from '@/typings/game';
import { Loader, Text } from '@/components/Common';
import { getFullName } from '@/utils/user';
import { formatPrice } from '@/utils/number';
import { useGetRankingPosition, useGetTemplateRule } from '@/queries/useGame';
import { BLUE_CARD, RED_CARD, YELLOW_CARD } from '@/constants/images';
import { FILTER_LIMIT } from '@/constants/filter';
import { useGetUserProfile } from '@/queries/useUser';
import { User } from '@/typings/user';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';

type Props = {
  data: GameRankingTeamsScore[];
  gameId: string;
  divisionId: string;
  page: number;
  isFriend: string;
  isLoading: boolean;
};

const MAP_RARITY = {
  blue: BLUE_CARD,
  pink: RED_CARD,
  yellow: YELLOW_CARD,
};

const RankingTable = ({
  data = [],
  divisionId,
  gameId,
  page = 0,
  isFriend,
  isLoading,
}: Props) => {
  const { t } = useTranslation();
  const { data: templateRule } = useGetTemplateRule(gameId);
  const { data: userProfile } = useGetUserProfile();

  // MY POSITION
  const { data: positionData } = useGetRankingPosition({
    divisionId,
    gameId,
  });

  const myPosition = _.get(positionData, 'position', -1);

  const myTotalPoint = _.get(positionData, 'totalPoint', 0);
  const myTeamId = _.get(positionData, 'id', '');

  const myIndexInList = _.findIndex(
    data,
    (item) => item?.createdBy?.id === userProfile?.id
  );
  const mySelf = _.find(
    data,
    (item) => item?.createdBy?.id === userProfile?.id
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

  const renderRow = (
    item: GameRankingTeamsScore,
    index: number,
    highlight: boolean,
    isMySelf?: boolean
  ) => {
    const totalPoint = _.get(item, 'totalPoint', 0);
    const rankingPosition = page * FILTER_LIMIT + index;

    // ROW
    const gameReward = _.get(item, 'gameReward');
    const jackpotReward = _.get(gameReward, 'jackpotReward', 0);
    const nftRewardTemplates: any = _.get(gameReward, 'nftRewardTemplates', []);
    const usdcRewards = _.sumBy(_.get(gameReward, 'usdcRewards', []), 'value');

    return (
      <Tr
        bg={highlight ? 'primary.50' : 'transparent'}
        cursor="pointer"
        _hover={{ bg: 'primary.50' }}
        onClick={() =>
          navigateTo(`${PATH.TEAM_SCORE}/${item.id}`, { league: divisionId })
        }
      >
        <Td>{rankingPosition}</Td>
        <Td>
          <Flex alignItems="center" pos="relative">
            {isMySelf && (
              <Icon
                as={MdPerson}
                color="gray.400"
                pos="absolute"
                left={['-20px', '-20px', '-40px']}
                fontSize={['md', 'md', '3xl']}
              />
            )}
            <Avatar
              src={item?.createdBy?.avatarUrl}
              borderRadius="full"
              boxSize={['30px', '40px']}
            />
            <Text ml={[2, 2, 4]}>{getFullName(item?.createdBy)}</Text>
          </Flex>
        </Td>
        <Td>{formatPrice(totalPoint)}</Td>
        <Td>
          <Flex gap={2} justifyContent="center">
            <Text>{usdcRewards ? `$${formatPrice(usdcRewards)}` : ''}</Text>
            {_.map(nftRewardTemplates, (item, index) => (
              <Image
                key={index}
                src={_.get(MAP_RARITY, item.rarity)}
                width="16px"
                height="20px"
              />
            ))}
          </Flex>
        </Td>
        {rewardJackpotLeague?.scoreCondition && (
          <Td textAlign="center">
            {jackpotReward ? `$${formatPrice(jackpotReward)}` : ''}
          </Td>
        )}
      </Tr>
    );
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t('rank')}</Th>
            <Th>{t('user')}</Th>
            <Th>{t('score')}</Th>
            <Th textAlign="center">{t('cash_and_cards_reward')}</Th>
            {rewardJackpotLeague?.scoreCondition && (
              <Th textAlign="center">{t('jackpot')}</Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Td colSpan={5}>
              <Flex justifyContent="center">
                <Loader />
              </Flex>
            </Td>
          )}
          {!isLoading && _.isEmpty(data) && (
            <Td colSpan={5}>
              <Text
                textAlign="center"
                fontWeight="bold"
                fontSize={['lg', 'lg', 'xl']}
                color="gray.400"
                translateText="there_are_not_any_teams_in_this_league"
              />
            </Td>
          )}
          {myIndexInList > 0 &&
            myPosition > 0 &&
            Number(page) === 1 &&
            _.size(data) > 1 &&
            renderRow(
              {
                totalPoint: myTotalPoint,
                createdBy: userProfile as User,
                id: myTeamId,
                ...mySelf,
              } as any,
              myPosition + 1,
              true,
              true
            )}
          {_.map(data, (item, index) =>
            renderRow(
              item,
              isFriend === 'true'
                ? _.get(item, 'globalPosition', 0) + 1
                : index + 1,
              _.get(item, 'createdBy.id') === userProfile?.id
            )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default RankingTable;
