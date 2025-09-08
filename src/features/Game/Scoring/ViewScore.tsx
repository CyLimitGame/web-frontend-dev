import React from 'react';
import { Box, Flex, useDisclosure, Icon, Collapse } from '@chakra-ui/react';
import _ from 'lodash';
import { FaCaretDown } from 'react-icons/fa';

import BestTeammateBonus from './Criterias/BestTeammateBonus';
import BestTeammateMalus from './Criterias/BestTeammateMalus';
import BetterGeneralClassificationRankingTeammate from './Criterias/BetterGeneralClassificationRankingTeammate';
import BetterStageRankingTeammate from './Criterias/BetterStageRankingTeammate';
import FinishStage from './Criterias/FinishStage';
import GeneralClassificationJersey from './Criterias/GeneralClassificationJersey';
import GeneralClassificationRanking from './Criterias/GeneralClassificationRanking';
import GeneralClassificationRankingOfRiderTeam from './Criterias/GeneralClassificationRankingOfRiderTeam';
import KomClassificationJersey from './Criterias/KomClassificationJersey';
import KomPoints from './Criterias/KomPoints';
import Points from './Criterias/Points';
import PointsClassificationJersey from './Criterias/PointsClassificationJersey';
import StageRanking from './Criterias/StageRanking';
import StageRankingOfRiderTeam from './Criterias/StageRankingOfRiderTeam';
import Breakaway from './Criterias/Breakaway';
import IntermediateSprintsPresence from './Criterias/IntermediateSprintsPresence';

import { Text } from '@/components/Common';
import { MatrixRole } from '@/typings/game.enum';

export const ROLES = [
  {
    role: MatrixRole.STAGE_RANKING,
  },
  {
    role: MatrixRole.GENERAL_CLASSIFICATION_RANKING,
  },
  {
    role: MatrixRole.GENERAL_CLASSIFICATION_JERSEY,
  },
  {
    role: MatrixRole.KOM_CLASSIFICATION_JERSEY,
    label: 'KOM (Mountain) classification jersey',
  },
  {
    role: MatrixRole.POINTS_CLASSIFICATION_JERSEY,
    label: 'Points (Sprint) classification jersey',
  },
  {
    role: MatrixRole.STAGE_RANKING_OF_RIDER_TEAM,
  },
  {
    role: MatrixRole.GENERAL_CLASSIFICATION_RANKING_OF_RIDER_TEAM,
    label: 'General classification ranking of rider’s team',
  },
  {
    role: MatrixRole.BETTER_STAGE_RANKING_TEAMMATE,
    label: 'Stage ranking of his better teammate',
  },
  {
    role: MatrixRole.BETTER_GENERAL_CLASSIFICATION_RANKING_TEAMMATE,
    label: 'General classification ranking of his better teammate',
  },
  {
    role: MatrixRole.BREAKAWAY,
  },
  {
    role: MatrixRole.POINTS,
    label: 'Points (Sprint) classification ranking',
  },
  {
    role: MatrixRole.KOM_POINTS,
    label: 'KOM (Mountain) classification ranking',
  },
  {
    role: MatrixRole.FINISH_STAGE,
  },
  {
    role: MatrixRole.INTERMEDIATE_SPRINTS_PRESENCE,
  },
  {
    role: MatrixRole.BEST_TEAMMATE_BONUS,
  },
  {
    role: MatrixRole.BEST_TEAMMATE_MALUS,
  },
];

type Props = {
  item: any;
  pcsRaceId: string;
};

const ViewScore = ({ item, pcsRaceId }: Props) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  const findRole = _.find(ROLES, (role) => role.role === item?.role);

  const label = _.get(findRole, 'label');

  const renderCriteria = () => {
    switch (item.role) {
      case MatrixRole.STAGE_RANKING:
        return <StageRanking pcsRaceId={pcsRaceId} />;

      case MatrixRole.GENERAL_CLASSIFICATION_RANKING:
        return <GeneralClassificationRanking pcsRaceId={pcsRaceId} />;

      case MatrixRole.STAGE_RANKING_OF_RIDER_TEAM:
        return <StageRankingOfRiderTeam pcsRaceId={pcsRaceId} />;

      case MatrixRole.GENERAL_CLASSIFICATION_RANKING_OF_RIDER_TEAM:
        return (
          <GeneralClassificationRankingOfRiderTeam pcsRaceId={pcsRaceId} />
        );

      case MatrixRole.BETTER_STAGE_RANKING_TEAMMATE:
        return <BetterStageRankingTeammate pcsRaceId={pcsRaceId} />;

      case MatrixRole.BETTER_GENERAL_CLASSIFICATION_RANKING_TEAMMATE:
        return (
          <BetterGeneralClassificationRankingTeammate pcsRaceId={pcsRaceId} />
        );

      case MatrixRole.KOM_POINTS:
        return <KomPoints pcsRaceId={pcsRaceId} />;

      case MatrixRole.POINTS:
        return <Points pcsRaceId={pcsRaceId} />;

      case MatrixRole.GENERAL_CLASSIFICATION_JERSEY:
        return <GeneralClassificationJersey pcsRaceId={pcsRaceId} />;

      case MatrixRole.KOM_CLASSIFICATION_JERSEY:
        return <KomClassificationJersey pcsRaceId={pcsRaceId} />;

      case MatrixRole.POINTS_CLASSIFICATION_JERSEY:
        return <PointsClassificationJersey pcsRaceId={pcsRaceId} />;

      case MatrixRole.BREAKAWAY:
        return <Breakaway pcsRaceId={pcsRaceId} />;

      case MatrixRole.FINISH_STAGE:
        return <FinishStage pcsRaceId={pcsRaceId} />;

      case MatrixRole.INTERMEDIATE_SPRINTS_PRESENCE:
        return <IntermediateSprintsPresence pcsRaceId={pcsRaceId} />;

      case MatrixRole.BEST_TEAMMATE_BONUS:
        return <BestTeammateBonus pcsRaceId={pcsRaceId} />;

      case MatrixRole.BEST_TEAMMATE_MALUS:
        return (
          <Box>
            <BestTeammateMalus pcsRaceId={pcsRaceId} />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Flex
        gap={4}
        onClick={onToggle}
        userSelect="none"
        cursor="pointer"
        alignItems="center"
        _hover={{ opacity: '0.5' }}
      >
        <Icon
          as={FaCaretDown}
          transform={isOpen ? 'rotate(180deg)' : 'rotate(0)'}
          transition="transform .2s"
        />
        <Text translateText={label || item?.role} textTransform="initial" />
      </Flex>
      <Collapse in={isOpen}>
        <Box bg="input" borderRadius="xl" p={4} mb={4} mt={2}>
          <Box>{renderCriteria()}</Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default ViewScore;
