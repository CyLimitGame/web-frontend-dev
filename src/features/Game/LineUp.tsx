import React from 'react';
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import Image from 'next/image';
import _ from 'lodash';

import { LeagueIcon } from '@/features/core/Common';
import { useGetTemplateRule } from '@/queries/useGame';
import { LoaderContainer, Text } from '@/components/Common';
import { getRarityImage } from '@/utils/string';

type Props = {
  gameId: string;
};

type RarityProps = {
  data: any;
};

const Rarity = ({ data }: RarityProps) => {
  const rarityRules = _.get(data, 'rarityRules');
  const rarityBonuses = _.get(data, 'rarityBonuses');

  const hasValue = _.pickBy(
    rarityRules,
    (value) => _.get(value, '[0]', 0) > 0 || _.get(value, '[1]', 0) > 0
  );
  const isOnlyOne = _.size(hasValue) === 1;

  return (
    <Flex direction={['column', 'column', 'row']}>
      {_.map(rarityRules, (value, key) => {
        const min = _.get(value, '[0]', 0);
        const max = _.get(value, '[1]', 0);
        const isShow = min || max;

        const bonus = _.get(rarityBonuses, key, 0);

        if (!isShow) {
          return <></>;
        }
        return (
          <Td key={key} textTransform="uppercase">
            <Flex gap={2}>
              <Box
                pos="relative"
                width="30px"
                height="40px"
                borderRadius="sm"
                overflow="hidden"
              >
                <Image key={key} src={getRarityImage(key)} layout="fill" />
              </Box>
              <Box fontSize="sm">
                <Flex gap={2}>
                  <Text translateText={key} />
                  <span>:</span>
                  <Text
                    translateText={
                      isOnlyOne ? `${key}_cards_value` : 'min_and_max_cards'
                    }
                    variables={isOnlyOne ? { value: max } : { min, max }}
                  />
                </Flex>
                <Text
                  translateText={bonus < 0 ? 'penalty_value' : 'bonus_value'}
                  variables={{ value: bonus }}
                />
              </Box>
            </Flex>
          </Td>
        );
      })}
    </Flex>
  );
};

const LineUp = ({ gameId }: Props) => {
  const { data, isLoading } = useGetTemplateRule(gameId);

  const imageUrl = _.get(data, 'imageUrl', '');
  const rule = _.get(data, 'rule', {});
  const leagues = _.get(rule, 'leagues', []);

  return (
    <LoaderContainer isLoading={isLoading}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        direction={['column-reverse', 'column-reverse', 'row']}
        gap={2}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          translateText="captain_bonus_value"
          variables={{ value: 25 }}
          fontSize={['xl', 'xl', '2xl']}
        />
        <Box>
          <Flex justifyContent="end">
            <Image src={imageUrl} width="200px" height="100px" />
          </Flex>
        </Box>
      </Flex>

      <TableContainer>
        <Table variant="simple">
          <Tbody
            sx={{
              td: { border: 'none', pl: 0 },
              tr: { borderBottom: '1px dashed', borderColor: 'border' },
            }}
          >
            <Flex direction="column">
              {_.map(leagues, (item: any) => {
                const name = _.get(item, 'division.name');
                return (
                  <Tr key={name}>
                    <Td>
                      <Flex gap={2}>
                        <LeagueIcon name={name} isShowText={false} />
                        <Text textTransform="uppercase" fontWeight="bold">
                          {name}
                        </Text>
                      </Flex>
                    </Td>
                    <Rarity data={item.division} />
                  </Tr>
                );
              })}
            </Flex>
          </Tbody>
        </Table>
      </TableContainer>
    </LoaderContainer>
  );
};

export default LineUp;
