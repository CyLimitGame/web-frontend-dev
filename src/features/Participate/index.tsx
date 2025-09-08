import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';
import Image from 'next/image';

import MyTeam from './MyTeam';
import Leagues from './Leagues';
import { useParticipate } from './useParticipate';
import AddStagiaire from './AddStagiaire';
import CaptainModal from './CaptainModal';

import InfoModal from './InfoModal';

import ListCardsForCreateTeam from '@/features/core/ListCardsForCreateTeam';
import { Container, Text } from '@/components/Common';
import MainLayout from '@/layouts/MainLayout';
import { GAME_ACCESS, GAME_EXPERT } from '@/constants/images';

const Participate = () => {
  const {
    gameId,
    divisionId,
    setDivisionId,
    indexSelected,
    setIndexSelected,
    nftIds,
    nfts,
    setNfts,
    onRemove,
    isFilled,
    roles,
    riderIds,
    onConfirm,
    isLoading,
    setCaptainId,
    captainId,
    isDisabledConfirmButton,
    isOpenStagiaire,
    onOpenStagaire,
    onCloseStagiaire,
    gameMode,
    totalCapScore,
    totalScoreRequire,
    isOpenCaptain,
    onCloseCaptain,
    onOpenCaptain,
    captain,
    isHasWhite,
    activeRarity,
    isUnderstandingCaptainRule,
    teamId,
    leagueName,
    traineeBonus,
    teamDivisionIds,
  } = useParticipate();

  const handleAddCardToTeam = (card: any) => {
    setNfts((current) => [...current, { ...card, index: indexSelected }]);
    const findRoleInfo = _.find(
      roles,
      (role) => !role.id && role.index !== indexSelected
    );
    if (findRoleInfo) {
      setIndexSelected(findRoleInfo.index);
    }
  };

  return (
    <MainLayout isShowFooter={false}>
      <Box>
        <Container py={5}>
          <Flex justifyContent="space-between" gap={2} alignItems="center">
            <Flex alignItems="center">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                textTransform="uppercase"
                translateText="my_team"
                mr={20}
                display={['none', 'none', 'none', 'block']}
              />
              <Leagues
                gameId={gameId}
                divisionId={divisionId}
                onChange={setDivisionId}
                gap={[2, 2, 2, 4]}
              />
            </Flex>
            <Box display={['none', 'none', 'none', 'block']}>
              <Image
                src={gameMode === 'cap' ? GAME_ACCESS : GAME_EXPERT}
                width="150px"
                height="40px"
              />
            </Box>
          </Flex>
          <Box mt={4}>
            <ListCardsForCreateTeam
              cardSelectedIds={nftIds}
              disabledChoose={isFilled}
              riderIds={riderIds}
              onSelectCard={handleAddCardToTeam}
              onClickAddStagiaire={onOpenStagaire}
              isAddStagiaire={isHasWhite}
              activeRarity={activeRarity}
              divisionId={divisionId}
              includedTeamId={teamId}
              leagueName={leagueName}
            />
          </Box>
          <Box mt={10}>
            <MyTeam
              gameId={gameId}
              indexSelected={indexSelected}
              onSelect={setIndexSelected}
              onRemove={onRemove}
              nfts={nfts}
              onConfirm={onConfirm}
              isLoading={isLoading}
              captainId={captainId}
              isDisabledConfirmButton={isDisabledConfirmButton}
              teamdivisionIds={teamDivisionIds}
              onSelectCaptain={(id) => {
                setCaptainId(id);
                if (!isUnderstandingCaptainRule) {
                  onOpenCaptain();
                }
              }}
              divisionId={divisionId}
            />
          </Box>
          <AddStagiaire
            isOpen={isOpenStagiaire}
            onClose={onCloseStagiaire}
            gameId={gameId}
            cardSelectedIds={nftIds}
            disabledChoose={isFilled}
            riderIds={riderIds}
            divisionId={divisionId}
            totalCapScore={totalCapScore}
            totalScoreRequire={totalScoreRequire}
            gameMode={gameMode}
            onConfirm={(card) => {
              onCloseStagiaire();
              handleAddCardToTeam(card);
            }}
            traineeBonus={traineeBonus}
            includedTeamId={teamId}
          />
          <CaptainModal
            isOpen={isOpenCaptain}
            onClose={onCloseCaptain}
            captain={captain}
            captainId={captainId}
          />
          <InfoModal />
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Participate;
