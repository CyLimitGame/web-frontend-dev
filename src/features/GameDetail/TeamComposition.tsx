import React from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import {
  Box,
  Card,
  Flex,
  Stack,
  Tag,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import Image from 'next/image';

import { useGetTemplateRule } from '@/queries/useGame';
import { DataGridWithFlex, Text } from '@/components/Common';
import { MAP_ROLES } from '@/constants/common';
import {
  BLUE_CARD,
  YELLOW_CARD,
  GRAY_CARD,
  RED_CARD,
  NO_CARD,
} from '@/constants/images';

export const MAP_CARD = {
  blue: BLUE_CARD,
  yellow: YELLOW_CARD,
  white: GRAY_CARD,
  pink: RED_CARD,
  na: NO_CARD,
  trainee: NO_CARD,
};

const TeamComposition = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  const { data: gameInfo } = useGetTemplateRule(id as string);
  const column = useBreakpointValue({ base: 1, sm: 2, md: 2, lg: 3 });

  const roles = _.get(gameInfo, 'rule.roles');
  const leagues = _.get(gameInfo, 'rule.leagues');

  const isOnedayrace = !!_.get(gameInfo, 'race.is_onedayrace');

  return (
    <Stack spacing={4}>
      <Card p={4}>
        <Text
          translateText="team_composition"
          fontSize="2xl"
          fontWeight="bold"
        />
        <Flex gap={4} mt={4} flexWrap="wrap">
          {_.map(roles, (item, index) => (
            <Tag key={index} size="lg">
              {t(
                MAP_ROLES[_.get(item, 'role', '') as keyof typeof MAP_ROLES]
              ).replace(isOnedayrace ? '(GC)' : '', '')}
            </Tag>
          ))}
        </Flex>
      </Card>
      <Card p={4}>
        <Text translateText="bonus" fontSize="2xl" fontWeight="bold" />
        <Flex mt={4}>
          <Tag size="lg">{t('captain_bonus_value', { value: 25 })}</Tag>
        </Flex>
      </Card>
      <Card p={4}>
        <Text translateText="card_board" fontSize="2xl" fontWeight="bold" />
        <Stack mt={4} spacing={4}>
          {_.map(leagues, (item, index) => {
            const name = _.get(item, 'division.name');
            const rarityRules = _.get(item, 'division.rarityRules');
            const rarityBonuses = _.get(item, 'division.rarityBonuses');

            const cards = _.map(
              _.pickBy(
                rarityRules,
                (value) =>
                  _.get(value, '[0]', 0) > 0 || _.get(value, '[1]', 0) > 0
              ),
              (value, key) => ({ key, value })
            );

            return (
              <Box
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
                key={index}
              >
                <Text fontWeight="bold" color="gray.600" mb={4}>
                  {name}
                </Text>
                <DataGridWithFlex
                  columns={column as number}
                  spacing="10px"
                  data={_.orderBy(cards, (item) =>
                    _.indexOf(
                      ['yellow', 'pink', 'blue', 'white', 'na'],
                      item.key
                    )
                  )}
                  containerProps={{ justifyContent: 'center' }}
                  renderItem={(item) => (
                    <Flex
                      p={4}
                      bgColor="gray.100"
                      borderRadius="md"
                      alignItems="center"
                      gap={4}
                    >
                      <Box>
                        <Image
                          src={_.get(MAP_CARD, item.key)}
                          width="30px"
                          height="44px"
                        />
                      </Box>
                      <Box fontSize="sm">
                        <Text>• {t(item.key)}</Text>
                        <Text
                          translateText="min_max_cards_value"
                          variables={{
                            value: `${_.get(item, 'value[0]')} - ${_.get(
                              item,
                              'value[1]'
                            )}`,
                          }}
                        />
                        <Text
                          translateText="bonus_value"
                          variables={{ value: _.get(rarityBonuses, item.key) }}
                        />
                      </Box>
                    </Flex>
                  )}
                />
              </Box>
            );
          })}
        </Stack>
      </Card>
    </Stack>
  );
};

export default TeamComposition;
