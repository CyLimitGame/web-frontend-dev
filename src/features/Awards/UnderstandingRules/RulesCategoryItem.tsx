import React from 'react';
import {
  Box,
  Card,
  Flex,
  Icon,
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
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';

import LearnRulesQuest from './LearnRulesQuest';

import { UnderstandingRuleCategory } from '@/typings/awards';

const RulesCategoryItem = ({
  category,
}: {
  category: UnderstandingRuleCategory;
}) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return category.understandingRules?.length ? (
    <Card bg="whiteAlpha.160" mt={4} justifyContent="space-between">
      <Stack p={4} gap={5}>
        <Stack spacing={2} flex={1}>
          <Flex flex={1} justifyContent="flex-start">
            <Text fontWeight="bold" w="100%">
              {locale === 'fr' && category.name2
                ? category.name2
                : category.name1}
            </Text>
            <Text w="100%">
              {t('count_completed', {
                count:
                  _.filter(category.understandingRules, { isClaimed: true })
                    ?.length || 0,
                total: category.understandingRules?.length || 0,
              })}
            </Text>
          </Flex>
          <Stack flex={1} justifyContent="flex-end">
            <Progress
              min={0}
              max={category.understandingRules?.length || 0}
              value={
                _.filter(category.understandingRules, { isClaimed: true })
                  ?.length || 0
              }
              colorScheme="green"
            />
          </Stack>
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
                {_.map(category.understandingRules, (quest) => (
                  <Box as="tr" key={quest.id}>
                    <Td w="70%" justifyContent="flex-start">
                      <Text fontWeight="bold">
                        {locale === 'fr' && quest.title2
                          ? quest.title2
                          : quest.title1}
                      </Text>
                    </Td>
                    <Td justifyContent="flex-end">
                      {quest.isClaimed ? (
                        <Icon
                          as={AiFillCheckCircle}
                          fontSize="2xl"
                          color="green.500"
                        />
                      ) : (
                        <Icon
                          as={AiFillCloseCircle}
                          fontSize="2xl"
                          color="red.500"
                        />
                      )}
                    </Td>
                    <Td justifyContent="flex-end">
                      <LearnRulesQuest quest={quest} />
                    </Td>
                  </Box>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Card>
  ) : null;
};

export default RulesCategoryItem;
