import React from 'react';
import _ from 'lodash';
import { Avatar, Box, Flex, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { RarityWithStar } from '@/features/core/Common';
import { useGetRewardPool } from '@/queries/useGame';
import { LoaderContainer, NoResultFound, Text } from '@/components/Common';
import { SelectInput } from '@/components/Inputs';

type Props = {
  gameId: string;
};

type RewardItemProps = {
  item: any;
  rarity: string;
};

const RewardItem = ({ item, rarity }: RewardItemProps) => {
  const name = _.get(item, 'name');
  const imageUrl = _.get(item, 'imageUrl');
  const actualTeam = _.get(item, 'actualTeam.name');
  const stars = _.get(item, 'stars');

  return (
    <Flex
      justifyContent="space-between"
      border="1px solid white"
      borderRadius="xl"
      p={2}
      fontWeight="bold"
      alignItems="center"
      fontSize={['xs', 'sm', 'md']}
    >
      <Box w={['50px', '50px', '100px']}>
        <Avatar size="sm" src={imageUrl} />
      </Box>
      <Box flex={1}>
        <Text>{name}</Text>
      </Box>
      <Box flex={1}>
        <Text>{actualTeam}</Text>
      </Box>
      <Box>
        <RarityWithStar rarity={rarity} star={stars} />
      </Box>
    </Flex>
  );
};

const RewardPool = ({ gameId }: Props) => {
  const { register, watch, setValue } = useForm({
    defaultValues: { rarity: 'blue', stars: '' },
  });
  const rarity = watch('rarity');
  const stars = watch('stars');

  const { data, isLoading } = useGetRewardPool({
    gameId,
    rarity: rarity,
  });

  const items = _.get(data, 'items', []);
  const listStars = _.map(items, (elm: any) => elm.stars);

  return (
    <Box>
      <Flex gap={2}>
        <Box>
          <SelectInput
            choices={[
              { id: '1', label: 'pink', value: 'pink' },
              { id: '2', label: 'blue', value: 'blue' },
            ]}
            style={{ border: '1px solid white' }}
            w={['150px', '200px']}
            label="scarcity"
            lableProps={{ fontSize: ['xs', 'sm', 'md'] }}
            {...register('rarity')}
            onChange={(e) => {
              register('rarity').onChange(e);
              setValue('stars', '');
            }}
          />
        </Box>
        <Box>
          <SelectInput
            choices={_.orderBy(
              _.map(_.uniq(listStars), (star) => ({
                id: star,
                label: star,
                value: star,
              })),
              'value'
            )}
            style={{ border: '1px solid white' }}
            w={['150px', '200px']}
            label="stars"
            lableProps={{ fontSize: ['xs', 'sm', 'md'] }}
            showEmptyOption
            {...register('stars')}
          />
        </Box>
      </Flex>
      <LoaderContainer
        isLoading={isLoading}
        notFoundComponent={<NoResultFound type="common" />}
        dataFound={items}
      >
        <Stack spacing={2} mt={2}>
          {_.map(
            stars
              ? _.filter(items, (elm: any) => elm.stars === Number(stars))
              : items,
            (item: any) => (
              <RewardItem key={item.id} item={item} rarity={rarity} />
            )
          )}
        </Stack>
      </LoaderContainer>
    </Box>
  );
};

export default RewardPool;
