import React from 'react';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import { Flex } from '@chakra-ui/react';

import { CountdownTime, Text, TextOneLine } from '@/components/Common';

type Props = {
  startDate: string;
  endDate: string;
  isUsingLiveRanking: boolean;
  isRewardConfirmed: boolean;
};

const Time = ({
  startDate,
  endDate,
  isUsingLiveRanking,
  isRewardConfirmed,
}: Props) => {
  const { t } = useTranslation();

  const _renderButton = () => {
    const isComing = moment().isBefore(startDate);
    const isInProgress =
      moment().isAfter(startDate) && moment().isBefore(endDate);
    const isPast = moment().isAfter(endDate);

    if (isComing) {
      return (
        <Flex alignItems="center">
          <Text translateText="start_after" fontSize="sm" color="primary.500" />
          <Text fontSize="sm" color="error.500" ml={2}>
            <CountdownTime date={startDate} />
          </Text>
        </Flex>
      );
    }
    if (isInProgress) {
      return (
        <Text fontSize="sm" color="success.500">
          {t(isUsingLiveRanking ? 'happening_live' : 'happening')}
        </Text>
      );
    }
    if (isPast) {
      return (
        <TextOneLine
          fontSize="sm"
          color="error.500"
          value={t(
            isRewardConfirmed
              ? 'ended_time_final_results'
              : 'ended_time_provisional_results',
            {
              time: moment(endDate).fromNow(),
            }
          )}
        />
      );
    }

    return null;
  };

  return <React.Fragment>{_renderButton()}</React.Fragment>;
};

export default Time;
