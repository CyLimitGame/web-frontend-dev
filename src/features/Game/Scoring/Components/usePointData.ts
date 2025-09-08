import { useMemo } from 'react';
import _ from 'lodash';
import moment from 'moment';

import { useGameContext } from '../../GameContext';

import { useGetGameScoring, useGetTemplateRule } from '@/queries/useGame';
import { fixedNumber } from '@/utils/common';
import { MatrixRole, Role } from '@/typings/game.enum';

type Props = {
  pcsRaceId: string;
  matrixRole: MatrixRole;
};

const sortRoles = (roles: string[]) => {
  const orderRoles = [
    Role.LEADER,
    Role.CLIMBER,
    Role.SPRINTER,
    Role.FREE_ELECTRON,
    Role.DOMESTIC,
  ];
  const rolesWithIndex = _.map(roles, (item) => ({
    name: item,
    index: _.indexOf(orderRoles, item),
  }));

  return _.map(_.sortBy(rolesWithIndex, ['index']), 'name');
};

export const usePointData = ({ pcsRaceId, matrixRole }: Props): any => {
  const { gameContext } = useGameContext();

  const { data: templateRule, isLoading: isLoadingGameRule } =
    useGetTemplateRule(gameContext.gameId as string);
  const startDate = _.get(templateRule, 'startDate', '');
  const endDate = _.get(templateRule, 'endDate', '');
  const isGameComing = moment().isBefore(startDate);
  const isGameEnded = moment().isAfter(endDate);

  const info = useMemo(() => {
    if (templateRule) {
      const races = _.get(templateRule, 'races', []);
      const gameMode = _.get(templateRule, 'gameMode');

      const race = _.get(templateRule, 'race', {});
      const isMultiRaces = _.get(templateRule, 'isMultiRaces', false);
      const findRace = isMultiRaces
        ? _.find(races, (item: any) => item.pcsRaceId === pcsRaceId)
        : race;
      const raceId = _.get(findRace, isMultiRaces ? 'race.race_id' : 'race_id');
      const rankingTemplateId = isMultiRaces
        ? _.get(findRace, 'rankingTemplateId')
        : _.get(templateRule, 'rankingTemplateId');
      const rankingTemplate = isMultiRaces
        ? _.get(findRace, 'rankingTemplate')
        : _.get(templateRule, 'rankingTemplate');

      const roles: string[] = _.uniq(
        _.map(_.get(templateRule, 'rule.roles'), ({ role }) => role)
      );

      const matrixRoles = _.keyBy(rankingTemplate?.matrixRoles, 'role');

      return {
        raceId,
        rankingTemplateId,
        roles,
        matrixRoles: _.keyBy(rankingTemplate?.matrixRoles, 'role'),
        scoreByRankingRules: rankingTemplate?.scoreByRankingRules,
        scoreByWinnerOfStageRules: rankingTemplate?.scoreByWinnerOfStageRules,
        matrixRole: {
          ..._.get(matrixRoles, matrixRole),
          roles: _.filter(_.get(matrixRoles, `${matrixRole}.roles`), (item) =>
            roles.includes(item.name)
          ),
        },
        isMultiRaces,
        gameMode,
        races: _.map(races, (item: any) => ({
          id: item.pcsRaceId,
          label: item.race.name,
          value: item.pcsRaceId,
        })),
        race,
      };
    }
    return {};
  }, [templateRule, pcsRaceId]);

  const { raceId, rankingTemplateId } = info as any;
  const { data: gameScoring, isLoading: isLoadingGameScoring } =
    useGetGameScoring({
      id: gameContext.gameId as string,
      raceId: raceId,
      rankingTemplateId: rankingTemplateId,
      isGameComing,
      isDisabled: !templateRule,
    });

  // For game is started
  const scoring = useMemo(() => {
    if (gameScoring) {
      const { criteriasPoints } = gameScoring;
      const criteriasPointResults = _.map(
        criteriasPoints,
        ({ points, type }) => ({
          type,
          points: _.map(points, ({ point, rank }) => ({
            point,
            rank,
            label: rank,
            roles: _.keyBy(
              _.map(
                _.filter(
                  _.get(info, `matrixRoles[${type}].roles`),
                  ({ name }) => info.roles?.includes(name)
                ),
                ({ value, name }) => ({
                  name,
                  value,
                  label: fixedNumber((value / 100) * point, 2),
                })
              ),
              'name'
            ),
          })),
        })
      );

      return {
        points: _.get(
          _.keyBy(criteriasPointResults, 'type'),
          `${matrixRole}.points`
        ),
        stageNumber: _.get(gameScoring, 'info.stageNumber', 0),
        totalKms: _.get(gameScoring, 'info.totalKms', 0),
        attackKm: _.get(gameScoring, 'info.attackKm', false),
        totalRiders: _.get(gameScoring, 'info.totalRiders', 0),
        criteriasPoints,
      };
    }
    return {};
  }, [gameScoring]);

  // For game is coming
  const gameComingScoring = useMemo(() => {
    if (isGameComing && gameScoring) {
      const { scoreByRankingRulesWithPoints } = gameScoring;

      const matrixRoles = _.groupBy(scoreByRankingRulesWithPoints, 'name');
      const findByMatrixRole = matrixRoles[matrixRole];

      const rankGetPoint = _.get(
        _.find(findByMatrixRole, ({ type }) => type === 'rank_get_point'),
        'value',
        0
      );

      const ranks = _.orderBy(
        _.filter(findByMatrixRole, ({ type }) => type === 'rank'),
        'value'
      );
      const convertRanks = _.map(ranks, (rank, index) => ({
        ...rank,
        isLast: index === _.size(ranks) - 1,
      }));

      const topPercentages = _.map(
        _.orderBy(
          _.filter(findByMatrixRole, ({ type }) => type === 'top_percentage'),
          'value'
        ),
        (item, index) => ({ ...item, isFirst: index === 0 })
      );

      let list: any[];

      if (_.isEmpty([...convertRanks, ...topPercentages])) {
        const minPoint = _.find(
          findByMatrixRole,
          ({ type }) => type === 'min_point'
        );
        const maxPoint = _.find(
          findByMatrixRole,
          ({ type }) => type === 'max_point'
        );
        const percentageGetPoint = _.find(
          findByMatrixRole,
          ({ type }) => type === 'percentage_get_point'
        );

        list = [
          {
            label: `1 → Top ${percentageGetPoint?.value}%`,
            roles: _.keyBy(
              _.map(
                _.filter(
                  _.get(info, `matrixRoles[${matrixRole}].roles`),
                  ({ name }) => info.roles?.includes(name)
                ),
                ({ value, name }) => {
                  return {
                    name,
                    value,
                    label: `${fixedNumber(
                      (value / 100) * _.get(maxPoint, 'rankingPoints', 0),
                      2
                    )} → ${fixedNumber(
                      (value / 100) * _.get(minPoint, 'rankingPoints', 0),
                      2
                    )}`,
                  };
                }
              ),
              'name'
            ),
          },
        ];
      } else {
        list = _.map(
          [...convertRanks, ...topPercentages],
          (item: any, index, arr) => {
            const label = () => {
              if (item.type === 'rank') {
                return item.value;
              }

              const previousItem: any = _.get(arr, `${index - 1}`);

              return item.isFirst
                ? `${previousItem.value} → Top ${item.value}%`
                : `Top ${previousItem.value}% ${
                    previousItem.isExtended ? '+ 1' : ''
                  } → Top ${item.value}%`;
            };
            return {
              ...item,
              label: label(),
              roles: _.keyBy(
                _.map(
                  _.filter(
                    _.get(info, `matrixRoles[${matrixRole}].roles`),
                    ({ name }) => info.roles?.includes(name)
                  ),
                  ({ value, name }) => {
                    const previousRankingPoints =
                      _.get(arr, `${index - 1}.rankingExtendedPoints`, 0) ||
                      _.get(arr, `${index - 1}.rankingPoints`, 0);
                    const label = () => {
                      if (item.type === 'rank') {
                        return fixedNumber(
                          (value / 100) * item.rankingPoints,
                          2
                        );
                      }
                      return `${fixedNumber(
                        (value / 100) * previousRankingPoints,
                        2
                      )} → ${fixedNumber(
                        (value / 100) * item.rankingPoints,
                        2
                      )}`;
                    };

                    return {
                      name,
                      value,
                      label: label(),
                    };
                  }
                ),
                'name'
              ),
            };
          }
        );
      }

      return {
        points:
          rankGetPoint && rankGetPoint <= _.size(ranks)
            ? _.take(list, rankGetPoint)
            : _.filter(list, (item) => !item.isLast),
        stageNumber: _.get(gameScoring, 'info.stageNumber', 0),
        totalKms: _.get(gameScoring, 'info.totalKms', 0),
        attackKm: _.get(gameScoring, 'info.attackKm', false),
        totalRiders: _.get(gameScoring, 'info.totalRiders', 0),
      };
    }

    return {};
  }, [gameScoring, isGameComing]);

  const pointsData = {
    ...info,
    ...scoring,
    ...gameComingScoring,
    isLoading: isLoadingGameRule || isLoadingGameScoring,
    isGameComing,
    isGameEnded,
  };

  return {
    ...pointsData,
    roles: sortRoles(pointsData.roles as string[]),
  };
};
