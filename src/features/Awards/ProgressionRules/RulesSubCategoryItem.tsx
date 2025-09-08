import React from 'react';
import {
  Box,
  Card,
  Flex,
  Progress,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import _ from 'lodash';

import { ProgressionRule } from '@/typings/awards';

const RulesSubCategoryItem = ({ data }: { data: ProgressionRule[] | any }) => {
  const { t } = useTranslation();
  const progressionRules = _.map(data, (progressionRule) => {
    const currentTimes = progressionRule.history?.times || 0;
    let currentLevel = progressionRule.history?.times || 0;

    const bidonCustomizes = _.sortBy(
      progressionRule.bidonCustomizes,
      (bidonCustomize) => {
        return Number(bidonCustomize.times);
      }
    );

    if (bidonCustomizes.length > 1) {
      const index = _.findIndex(
        _.reverse(JSON.parse(JSON.stringify(bidonCustomizes))),
        (bidonCustomize: any) => {
          return Number(bidonCustomize.times) <= Number(currentTimes);
        }
      );
      if (index > -1) {
        currentLevel = bidonCustomizes.length - index;
      }
    }

    // find the first bidonCustomize that has times larger than currentTimes or last bidonCustomize
    const bidonCustomize =
      _.find(bidonCustomizes, (bidonCustomize) => {
        return bidonCustomize.times > currentTimes;
      }) || _.last(bidonCustomizes);
    const maxTimes = Number(bidonCustomize?.times) || 1;

    return {
      ...progressionRule,
      currentTimes,
      maxTimes,
      currentLevel,
    };
  });

  return (
    <Card bg="whiteAlpha.160" mt={4} justifyContent="space-between">
      <Stack p={4} gap={5}>
        <Stack spacing={2} flex={1}>
          <Flex flex={1} justifyContent="flex-start">
            <Text fontWeight="bold" w="100%">
              {t(data[0]?.subcategory?.replace(/-/g, '_').replace(/:/g, '_'))}
            </Text>
          </Flex>
        </Stack>
        <Stack spacing={2} flex={1} justifyContent="center">
          <TableContainer marginTop="-20px">
            <Table variant="simple" w="100%">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {_.map(
                  progressionRules,
                  ({ quest, currentTimes, maxTimes, currentLevel }) => (
                    <Box as="tr" key={quest}>
                      <Td
                        w="40%"
                        justifyContent="flex-start"
                        borderTop="1px solid"
                        borderTopColor="gray.700"
                      >
                        <Text fontWeight="bold">
                          {t(quest?.replace(/-/g, '_').replace(/:/g, '_'))}
                        </Text>
                      </Td>
                      <Td
                        w="20%"
                        justifyContent="flex-end"
                        borderTop="1px solid"
                        borderTopColor="gray.700"
                      >
                        <Text>{t('level_value', { value: currentLevel })}</Text>
                      </Td>
                      <Td
                        w="40%"
                        justifyContent="flex-end"
                        borderTop="1px solid"
                        borderTopColor="gray.700"
                      >
                        <Progress
                          min={0}
                          max={maxTimes}
                          value={currentTimes}
                          colorScheme="green"
                          minWidth="200px"
                        />
                        <Text>
                          {currentTimes} / {maxTimes}
                        </Text>
                      </Td>
                    </Box>
                  )
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Card>
  );
};

export default RulesSubCategoryItem;
