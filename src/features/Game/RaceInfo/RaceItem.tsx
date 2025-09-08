import React from 'react';
import {
  Box,
  Center,
  Collapse,
  Flex,
  Icon,
  Image,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import _ from 'lodash';
import { useMutation } from 'react-query';
import { FaAngleDown } from 'react-icons/fa';

import { formatDate } from '@/utils/date';
import { LoaderOverlay, Text } from '@/components/Common';
import { getRaceInfo } from '@/apis';

type Props = {
  item: any;
  index: number;
  gameId: string;
};

const RaceItem = ({ item, index, gameId }: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  const name = _.get(item, 'race.name');
  const startDate = _.get(item, 'race.date_start', '');
  const endDate = _.get(item, 'race.date_end', '');
  const raceId = _.get(item, 'race.race_id', '');

  const { data, mutateAsync, isLoading } = useMutation(getRaceInfo);

  const handleToggle = async () => {
    if (_.isEmpty(data)) {
      await mutateAsync({ gameId, raceId });
    }
    onToggle();
  };

  return (
    <LoaderOverlay isLoading={isLoading}>
      <Box borderBottom="1px solid white">
        <Flex
          _hover={{ bg: 'input' }}
          py={2}
          cursor="pointer"
          userSelect="none"
          onClick={handleToggle}
          gap={2}
        >
          <Box w="50px" pl={4}>
            {index + 1}
          </Box>
          <Box flex={1} minW="400px">
            <Flex alignItems="center" gap={2}>
              <Icon
                as={FaAngleDown}
                transform={`rotate(${isOpen ? 180 : 0}deg)`}
              />
              <Text>{name}</Text>
            </Flex>
          </Box>
          <Box w="200px" display={['none', 'none', 'block']}>
            {formatDate(startDate)}
          </Box>
          <Box w="200px" display={['none', 'none', 'block']}>
            {formatDate(endDate)}
          </Box>
        </Flex>
        {!_.isEmpty(data) && (
          <Collapse in={isOpen}>
            <Stack spacing={4} pb={2}>
              {_.map(data, (race, index) => {
                const name = _.get(race, 'name');
                const imageUrl = _.get(race, 'imageUrl', '');
                return (
                  <Center key={index} flexDirection="column">
                    <Text mb={2}>{name}</Text>
                    <Image src={imageUrl} />
                  </Center>
                );
              })}
            </Stack>
          </Collapse>
        )}
      </Box>
    </LoaderOverlay>
  );
};

export default RaceItem;
