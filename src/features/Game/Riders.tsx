import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Center,
  Flex,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import SwitchModeScore from './Rank/SwitchModeScore';

import { useGetRiderResults, useGetTemplateRule } from '@/queries/useGame';
import {
  Circle,
  LoaderContainer,
  NoResultFound,
  Text,
} from '@/components/Common';
import { SelectInput } from '@/components/Inputs';
import { ROLE_CARDS } from '@/constants/select';
import { fixedNumber } from '@/utils/common';
import { BaseModal } from '@/components/Modal';
import { BaseButton } from '@/components/Button';

type Props = {
  gameId: string;
};

type RiderItemProps = {
  item: any;
  onClick: (item: any) => void;
};

const RiderItem = ({ item, onClick }: RiderItemProps) => {
  const name = _.get(item, 'rider.name');
  const actualTeam = _.get(item, 'rider.actualTeam.name');
  const imageUrl = _.get(item, 'rider.imageUrl');

  return (
    <Flex
      justifyContent="space-between"
      fontWeight="bold"
      border="1px solid white"
      p={2}
      borderRadius="xl"
      fontSize={['xs', 'sm', 'md']}
      alignItems="center"
    >
      <Box w={['50px', '50px', '100px']}>
        <Avatar size="sm" src={imageUrl} />
      </Box>
      <Box flex={1} mr={2}>
        <Text>{name}</Text>
      </Box>
      <Text flex={1} mr={1}>
        {actualTeam}
      </Text>
      <Circle
        onClick={() => onClick(item)}
        cursor="pointer"
        _hover={{ opacity: 0.5 }}
      >
        {fixedNumber(item.point, 0)}
      </Circle>
    </Flex>
  );
};

const useRider = (gameId: string, role: string, isAcquired: boolean) => {
  const { data: rule } = useGetTemplateRule(gameId);

  const races = _.map(_.get(rule, 'races'), (race: any) => race.pcsRaceId);
  const pcsRaceId = _.get(rule, 'race.id');
  const isUsingLiveRanking = _.get(rule, 'isUsingLiveRanking', 'false');
  const raceIds = !_.isEmpty(races) ? races : [pcsRaceId];

  const { data, isLoading } = useGetRiderResults(gameId, isAcquired);

  const items = _.map(data, (item) => ({
    ...item,
    point: _.get(
      _.find(item.roles, (roleItem) => roleItem.name === role),
      'value'
    ),
  }));

  return {
    items: _.orderBy(items, 'point', 'desc'),
    isLoading,
    raceIds,
    isUsingLiveRanking,
  };
};

const Riders = ({ gameId }: Props) => {
  const [columns, setColumns] = useState(10);
  const { t } = useTranslation();
  const router = useRouter();
  const gameMode = _.get(router, 'query.gameMode') || 'global';
  const status = (_.get(router, 'query.status') || 'comming') as string;

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [rider, setRider] = useState<any>({});
  const [isAcquired, setIsAcquired] = useState<boolean>(false);

  const { register, watch } = useForm({ defaultValues: { role: 'leader' } });
  const role = gameMode === 'global' ? watch('role') : 'cap';
  const { items, isLoading, raceIds, isUsingLiveRanking } = useRider(
    gameId,
    gameMode === 'global' ? role : 'cap',
    isAcquired
  );

  return (
    <>
      {status === 'in_progress' && isUsingLiveRanking && (
        <Box mb={4}>
          <SwitchModeScore isAcquired={isAcquired} onChange={setIsAcquired} />
        </Box>
      )}

      <LoaderContainer
        isLoading={isLoading}
        notFoundComponent={<NoResultFound type="common" />}
        dataFound={items}
      >
        {gameMode === 'global' && (
          <SelectInput
            choices={ROLE_CARDS}
            {...register('role')}
            w="200px"
            border="1px solid white"
          />
        )}
        <Stack spacing={2} mt={2}>
          {_.map(_.take(items, columns), (item: any) => (
            <RiderItem
              item={{ ...item, raceIds }}
              key={item.id}
              onClick={() => {
                setRider(item);
                onOpen();
              }}
            />
          ))}
        </Stack>
        {_.size(items) > columns && (
          <Center mt={2}>
            <BaseButton
              size={['sm', 'md']}
              variant="light"
              onClick={() => setColumns((current) => current + 10)}
            >
              {t('show_more')}
            </BaseButton>
          </Center>
        )}
      </LoaderContainer>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title={_.get(rider, 'rider.name')}
        size="lg"
        closeable
      >
        <Stack spacing={2}>
          {_.map(rider.points, (item, index) => (
            <Flex key={index} justifyContent="space-between">
              <Text>{t(_.get(item, 'type'))}</Text>
              <Text>
                {fixedNumber(
                  _.get(
                    _.find(item.roles, (elm) => elm.name === role),
                    'value',
                    0
                  ),
                  1
                )}
              </Text>
            </Flex>
          ))}
        </Stack>
      </BaseModal>
    </>
  );
};

export default Riders;
