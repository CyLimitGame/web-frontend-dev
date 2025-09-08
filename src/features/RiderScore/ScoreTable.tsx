import React, { ChangeEvent, useMemo, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Flex,
  Stack,
  Box,
  Select,
  FlexProps,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';
import moment from 'moment';

import Title from '../core/Common/Title';

import { formatPrice } from '@/utils/number';
import { BaseModal } from '@/components/Modal';
import { Text, Pagination } from '@/components/Common';
import { formatDate } from '@/utils/date';
import { RacesScore, ScoreRole } from '@/typings/card';
import { RaceType, RoleCard } from '@/typings/card.enum';
import { RACE_FILTER, ROLE_CARDS } from '@/constants/select';

const LIMIT = 5;

type ScoreTableProps = FlexProps & {
  races: RacesScore[];
};

const getPointByRole = (role: RoleCard, data: ScoreRole[]) => {
  const result = _.find(data, { name: role });
  return formatPrice(_.get(result, 'value', 0));
};

const getTotalPoint = (role: RoleCard, data: any) => {
  const result = _.find(data, (item) => item.name === role);
  return formatPrice(_.get(result, 'value', 0));
};

const ScoreTable = ({ races, ...rest }: ScoreTableProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState(RaceType.ACCESS);
  const [selectedCardRole, setSelectedCardRole] = useState<RoleCard | ''>('');
  const [raceSelected, setRace] = useState<any>();
  const [page, setPage] = useState(1);

  const handleChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as RaceType;
    if (value === RaceType.EXPERT) {
      setSelectedCardRole(RoleCard.LEADER);
    } else {
      setSelectedCardRole('');
    }
    setSelectedType(value);
    setPage(1);
  };

  const handleRoleCard = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as RoleCard;
    setSelectedCardRole(value);
    setPage(1);
  };

  const handleOpen = (race: any) => {
    setRace(race);
    if (!_.isEmpty(_.get(race, 'score.points'))) {
      onOpen();
    }
  };

  const data = useMemo(() => {
    const format = 'YYYY/MM/DD';
    const result = _.filter(races, (race) => {
      const endDate = moment(_.get(race, 'score.endDate', ''), format);
      const curentDate = moment(moment().format(format), format);
      return !endDate.isSameOrAfter(curentDate);
    });
    return _.orderBy(
      result,
      [(obj) => moment(_.get(obj, 'score.startDate', '')).valueOf()],
      ['desc']
    );
  }, [races]);

  const dataByPage = useMemo(() => {
    const firstIndex = (page - 1) * LIMIT;
    return _.slice(data, firstIndex, firstIndex + LIMIT);
  }, [data, page]);

  return (
    <Flex flexDirection="column" gap="8px" {...rest}>
      <Title title="races" />
      <Box
        border="2px solid"
        borderColor="white"
        borderRadius="20px"
        px={['5px', '20px']}
        flex="1"
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
        <Table variant="secondary">
          <Thead>
            <Tr>
              <Th>{t('race')}</Th>
              <Th>{t('start_date')}</Th>
              <Th>{t('end_date')}</Th>
              <Th isNumeric>{t('points')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {_.map(dataByPage, (race) => {
              const name = _.get(race, 'score.name');
              const endDate = _.get(race, 'score.endDate', '');
              const startDate = _.get(race, 'score.startDate', '');
              const roles = _.get(race, 'score.roles', []);
              return (
                <Tr
                  cursor="pointer"
                  key={race?.pcsRaceId}
                  onClick={() => handleOpen(race)}
                  _hover={{ bgColor: 'whiteAlpha.280' }}
                >
                  <Td>{name}</Td>
                  <Td minW={['0px', '0px', '140px']}>
                    {formatDate(startDate)}
                  </Td>
                  <Td minW={['0px', '0px', '140px']}>{formatDate(endDate)}</Td>
                  <Td isNumeric>
                    {getTotalPoint(
                      selectedCardRole === '' ? RoleCard.CAP : selectedCardRole,
                      roles
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Box mb="10px">
          <Pagination
            page={page}
            total={data?.length || 0}
            limit={LIMIT}
            onChangePage={(currentPage) => setPage(currentPage)}
          />
        </Box>

        <BaseModal
          isOpen={isOpen}
          onClose={onClose}
          title={_.get(raceSelected, 'score.name', '')}
          size="lg"
          closeable
        >
          <Stack spacing={2}>
            {_.map(_.get(raceSelected, 'score.points', []), (item, index) => (
              <Flex key={index} justifyContent="space-between">
                <Text>{t(_.get(item, 'type'))}</Text>
                <Text>
                  {getPointByRole(
                    selectedCardRole === '' ? RoleCard.CAP : selectedCardRole,
                    _.get(item, 'roles')
                  )}
                </Text>
              </Flex>
            ))}
          </Stack>
        </BaseModal>
      </Box>
    </Flex>
  );
};

export default ScoreTable;
