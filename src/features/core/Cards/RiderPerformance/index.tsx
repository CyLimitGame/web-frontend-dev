import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Box,
  BoxProps,
  Flex,
  Select,
  Text,
  Tooltip,
  chakra,
  shouldForwardProp,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import _ from 'lodash';
import { motion, isValidMotionProp } from 'framer-motion';

import { useTranslation } from 'next-i18next';

import { RacesScore } from '@/typings/card';
import { RaceType, RoleCard } from '@/typings/card.enum';
import { fixedNumber } from '@/utils/common';
import { RACE_FILTER, ROLE_CARDS } from '@/constants/select';
import { BaseModal } from '@/components/Modal';

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

type CalculatePerformanceReturn = {
  total: number;
  maxValue: number;
  average: number;
  values: {
    value: number;
    label: string;
  }[];
};

type OptionCalculatePerformance = {
  role?: RoleCard;
};

const calculatePerformance = (
  racesScores: RacesScore[],
  options: OptionCalculatePerformance
) =>
  new Promise<CalculatePerformanceReturn>((resolve) => {
    const { role = RoleCard.CAP } = options;

    if (typeof racesScores !== 'object') {
      resolve({
        total: 0,
        average: 0,
        maxValue: 0,
        values: [],
      });
    }
    let maxValue = 0;
    let total = 0;
    const values = racesScores.map((racesScore) => {
      const scores = _.get(racesScore, 'score.roles', []);
      const scoreDataByRole = _.find(scores, (item) => item?.name === role);
      let option = {
        value: 0,
        label: '',
      };
      if (scoreDataByRole) {
        option = {
          value: scoreDataByRole.value,
          label: _.get(racesScore, 'score.name', ''),
        };
      }
      if (option.value > maxValue) maxValue = option.value;
      total += option.value;

      return {
        ...option,
        points: _.map(_.get(racesScore, 'score.points', []), (point: any) => ({
          ...point,
          value: _.get(
            _.find(point.roles, (elm) => elm.name === role),
            'value',
            0
          ),
        })),
      };
    });
    resolve({
      maxValue,
      values,
      total,
      average: total / values.length,
    });
  });

type Props = BoxProps & {
  data: RacesScore[];
};

const RiderPerformance = ({ data, ...rest }: Props) => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState(RaceType.ACCESS);
  const [selectedCardRole, setSelectedCardRole] = useState('');
  const [performanceData, setPerformanceData] =
    useState<CalculatePerformanceReturn>({
      total: 0,
      average: 0,
      maxValue: 0,
      values: [],
    });
  const [pointDetail, setPointDetail] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getPerformanceData = useCallback(
    async (role = RoleCard.CAP) => {
      const res = await calculatePerformance(data, { role });

      setPerformanceData(res);
    },
    [data]
  );

  useEffect(() => {
    getPerformanceData();
  }, [getPerformanceData]);

  const handleChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as RaceType;
    if (value === RaceType.EXPERT) {
      setSelectedCardRole(RoleCard.LEADER);
      getPerformanceData(RoleCard.LEADER);
    } else {
      setSelectedCardRole('');
      getPerformanceData();
    }
    setSelectedType(value);
  };

  const handleRoleCard = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCardRole(value);
    getPerformanceData(value as RoleCard);
  };

  const isFullMode = performanceData?.values?.length > 6;

  const handleViewPointDetail = (values: any) => {
    setPointDetail(values);
    onOpen();
  };

  return (
    <Flex
      alignItems="center"
      mb="34px"
      flexDirection={['column', 'column', 'column', 'row']}
    >
      <Box
        flex="1"
        border="2px solid"
        borderColor="white"
        borderRadius="20px"
        px={['5px', '20px']}
        alignSelf="stretch"
        {...rest}
      >
        <Flex gap="10px" justifyContent="flex-end" mt="10px" mb="30px">
          <Select
            textTransform="uppercase"
            width="170px"
            value={selectedType}
            size={['sm', 'sm', 'sm', 'md']}
            onChange={handleChangeType}
          >
            {RACE_FILTER.map((item) => (
              <option key={item.value} value={item.value}>
                {t(item.label)}
              </option>
            ))}
          </Select>
          <Select
            disabled={selectedType === RaceType.ACCESS}
            textTransform="uppercase"
            width="170px"
            value={selectedCardRole}
            size={['sm', 'sm', 'sm', 'md']}
            onChange={handleRoleCard}
          >
            <option value="" disabled />
            {ROLE_CARDS.map((item) => (
              <option key={item.id} value={item.value}>
                {t(item.label)}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex
          alignItems="flex-end"
          gap={isFullMode ? '0px' : '20px'}
          justifyContent={isFullMode ? 'space-between' : 'flex-start'}
          h="250px"
          minW={['full', 'full', 'full', '800px']}
        >
          {_.map(performanceData.values, (option, index) => {
            return (
              <Tooltip
                label={option.label}
                placement="left"
                maxW="150px"
                key={index}
              >
                <Flex
                  cursor="pointer"
                  position="relative"
                  flexDirection="column"
                  key={index}
                  gap="10px"
                  alignItems="center"
                  alignSelf="stretch"
                  justifyContent="flex-end"
                  width={['15px', '30px', '30px', '40px']}
                  fontSize={['10px', 'sm', 'sm', 'md']}
                  _hover={{
                    '& > div:first-child': {
                      backgroundColor: 'whiteAlpha.500',
                    },
                  }}
                  onClick={() => {
                    handleViewPointDetail(option);
                  }}
                >
                  <ChakraBox
                    initial={{ maxHeight: '0' }}
                    animate={{
                      maxHeight: '100%',
                      transition: {
                        duration: 0.4,
                      },
                    }}
                    position="absolute"
                    w="full"
                    h={`${option.value}%`}
                    left="0"
                    bottom="0"
                    backgroundColor="whiteAlpha.240"
                    borderTopLeftRadius="8px"
                    borderTopRightRadius="8px"
                    transition="height 0.2s linear, background-color 0.2s linear"
                  />

                  <Text
                    whiteSpace="nowrap"
                    transform="rotate(180deg)"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    sx={{
                      writingMode: 'vertical-rl',
                    }}
                  >
                    {option.label}
                  </Text>
                  <Text fontWeight="bold">{fixedNumber(option.value, 0)}</Text>
                </Flex>
              </Tooltip>
            );
          })}
        </Flex>
      </Box>
      <Box
        flex="1"
        backgroundColor="white"
        minW={['2px', '2px', '2px', '20px']}
        maxW={['70px', '70px', '70px', '70px']}
        minH={['20px', '30px', '40px', '2px']}
      />
      <Box position="relative" fontStyle="normal">
        <Text
          position="absolute"
          left="50%"
          top={['100%', '100%', '100%', 'initial']}
          bottom={['initial', 'initial', 'initial', '100%']}
          transform={[
            'translate(-50%,2px)',
            'translate(-50%,2px)',
            'translate(-50%,2px)',
            'translate(-50%,-2px)',
          ]}
          fontSize={['sm', 'sm', 'md', 'lg']}
          fontWeight="bold"
          textTransform="uppercase"
        >
          {t('average')}
        </Text>
        <Flex
          px={['5px', '10px']}
          justifyContent="center"
          alignItems="center"
          aspectRatio="1/1"
          backgroundImage="url(/img/hexagon.png)"
          backgroundRepeat="no-repeat"
          backgroundSize="100% 100%"
          fontWeight="bold"
          fontSize={['21px', '25px', '30px', '42px']}
          minW={['44px', '44px', '60px', '80px']}
        >
          {fixedNumber(performanceData.average, 0)}
        </Flex>
      </Box>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title={pointDetail.label}
        size="lg"
        closeable
      >
        <Stack spacing={2}>
          {_.map(pointDetail.points, (item, index) => (
            <Flex key={index} justifyContent="space-between">
              <Text>{t(_.get(item, 'type'))}</Text>
              <Text>{fixedNumber(item.value, 2)}</Text>
            </Flex>
          ))}
        </Stack>
      </BaseModal>
    </Flex>
  );
};

export default RiderPerformance;
