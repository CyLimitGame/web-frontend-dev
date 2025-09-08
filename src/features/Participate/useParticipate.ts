import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import {
  useCreateTeam,
  useGetGameTeams,
  useGetTemplateRule,
  useUpdateTeam,
} from '@/queries/useGame';
import { useGetUserProfile } from '@/queries/useUser';

export const useParticipate = () => {
  const router = useRouter();
  const gameId = _.get(router, 'query.id') as string;
  const league = _.get(router, 'query.league');

  const { data: user } = useGetUserProfile();

  const [teamId, setTeamId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [indexSelected, setIndexSelected] = useState(0);
  const [nfts, setNfts] = useState<any[]>([]);
  const [captainId, setCaptainId] = useState<string>('');
  const {
    isOpen: isOpenStagiaire,
    onClose: onCloseStagiaire,
    onOpen: onOpenStagaire,
  } = useDisclosure();
  const {
    isOpen: isOpenCaptain,
    onClose: onCloseCaptain,
    onOpen: onOpenCaptain,
  } = useDisclosure();

  const { data: gameTeam } = useGetGameTeams(gameId);
  const { data } = useGetTemplateRule(gameId);
  const gameImageUrl = _.get(data, 'imageUrl', '');
  const gameName = _.get(data, 'name', '');
  const gameMode = _.get(data, 'gameMode', '') as string;
  const teamDivisionIds: string[] = _.get(gameTeam, 'teamDivisionIds', []);

  const roles = _.map(_.get(data, 'rule.roles', []), (item: any) => {
    const findNft = _.find(nfts, (nft) => nft.index === item.index);
    return findNft ? { ...findNft, ...item } : item;
  });

  const findLeague = _.find(
    _.get(data, 'rule.leagues', []),
    (item) => item.divisionId === divisionId
  );
  const rarityRules = _.get(findLeague, 'division.rarityRules', {});

  const creditLeague = _.find(
    _.get(data, 'creditLeagues', []),
    (item: any) => item.divisionId === divisionId
  );
  const totalCapScore = _.sumBy(nfts, 'capScore.averageCapScore');
  const totalScoreRequire = _.get(creditLeague, 'credit');
  const isValidScoreCapMode =
    gameMode === 'cap' ? totalCapScore <= totalScoreRequire : true;

  const onRemove = (index: number) => {
    setNfts((current) => _.filter(current, (nft) => nft.index !== index));
  };

  const { mutate, isLoading } = useCreateTeam();
  const { mutate: updateTeam, isLoading: isLoadingUpdateTeam } =
    useUpdateTeam();

  const onConfirm = () => {
    if (!captainId) {
      return onOpenCaptain();
    }

    if (_.includes(teamDivisionIds, divisionId)) {
      return updateTeam({
        id: gameId,
        nfts: roles,
        captainId,
        divisionId,
        teamId,
      });
    }

    mutate({
      captainId,
      divisionId,
      id: gameId,
      nfts: roles,
    });
  };

  const handleCloseCaptain = () => {
    onCloseCaptain();
  };

  useEffect(() => {
    if (gameTeam && league) {
      const findTeam = _.find(
        gameTeam?.teams,
        (team) => team.divisionId === league
      );

      const captainId = _.get(findTeam, 'captainId', '');
      setTeamId(_.get(findTeam, 'id'));

      setNfts(_.get(findTeam, 'cards', []));
      setDivisionId(league as string);
      setCaptainId(captainId);
    }
  }, [league, gameTeam]);

  return {
    gameId,
    divisionId,
    setDivisionId,
    indexSelected,
    setIndexSelected,
    nftIds: _.map(nfts, (nft) => nft.id),
    nfts,
    setNfts,
    onRemove,
    gameImageUrl,
    gameName,
    roles,
    isFilled: _.size(roles) === _.size(nfts),
    riderIds: _.map(nfts, (nft) => nft.rider.id),
    captainId,
    setCaptainId,
    onConfirm: onConfirm,
    isLoading: isLoading || isLoadingUpdateTeam,
    isDisabledConfirmButton:
      !divisionId ||
      _.size(roles) !== _.size(nfts) ||
      !gameId ||
      !isValidScoreCapMode,
    isOpenStagiaire,
    onCloseStagiaire,
    onOpenStagaire,
    gameMode,
    totalScoreRequire,
    totalCapScore,
    isOpenCaptain: isOpenCaptain,
    onCloseCaptain: handleCloseCaptain,
    onOpenCaptain,
    captain:
      _.find(nfts, (item) => item.id === captainId) || _.get(nfts, '[0]', {}),
    league,
    isHasWhite: _.get(findLeague, 'division.isApplyTrainee', false),
    activeRarity: _.filter(
      _.map(
        _.pickBy(rarityRules, (value) => _.get(value, '[1]') > 0),
        (_value, key) => key
      ),
      (rarity) => rarity !== 'trainee'
    ),
    isUnderstandingCaptainRule: !!user?.isUnderstandingCaptainRule,
    teamId,
    leagueName: _.get(findLeague, 'division.name', ''),
    traineeBonus: _.get(findLeague, 'division.rarityBonuses.trainee', 0),
    teamDivisionIds,
  };
};
