import React from 'react';
import _ from 'lodash';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import RaceItem from './RaceItem';

import { useGetTemplateRule } from '@/queries/useGame';
import { LoaderContainer, Text } from '@/components/Common';
import { formatDateTime } from '@/utils/date';

type Props = {
  gameId: string;
};

const RaceInfo = ({ gameId }: Props) => {
  const { data, isLoading } = useGetTemplateRule(gameId);
  const { t } = useTranslation();

  const startDate = _.get(data, 'startDate', '');
  const endDate = _.get(data, 'endDate', '');
  const races = _.get(data, 'races', '');

  return (
    <LoaderContainer isLoading={isLoading}>
      <Flex gap={2} pt={4} fontSize={['xs', 'xs', 'md']}>
        <Flex>
          <Text translateText="start_date" fontWeight="bold" />:
          <Text ml={2}>{formatDateTime(startDate)}</Text>
        </Flex>
        <Flex>
          <Text translateText="end_date" fontWeight="bold" />:
          <Text ml={2}>{formatDateTime(endDate)}</Text>
        </Flex>
      </Flex>

      {!_.isEmpty(races) && (
        <Box textTransform="initial" overflow="auto" mt={2}>
          <Text
            fontSize={['sm', 'md', 'xl']}
            fontWeight="bold"
            translateText="list_of_races"
          />
          <Box mt={4}>
            <Flex fontWeight="bold" gap={2}>
              <Box w="50px">{t('no')}</Box>
              <Box flex={1} minW="400px">
                {t('name')}
              </Box>
              <Box w="200px" display={['none', 'none', 'block']}>
                {t('start_date')}
              </Box>
              <Box w="200px" display={['none', 'none', 'block']}>
                {t('end_date')}
              </Box>
            </Flex>
          </Box>
          <Stack spacing={1} mt={2}>
            {_.map(races, (item, index) => {
              return <RaceItem item={item} index={index} gameId={gameId} />;
            })}
          </Stack>
        </Box>
      )}
    </LoaderContainer>
  );
};

export default RaceInfo;
