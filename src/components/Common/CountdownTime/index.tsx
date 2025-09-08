import React, { useEffect } from 'react';

import { CountdownProps } from '../Countdown';

import { Countdown } from '@/components/Common';
import { checkExpiredTime } from '@/utils/date';

type Props = Omit<CountdownProps, 'date'> & {
  date: string;
  onRetryEnable?: () => void;
};

const CoundownTime = ({ date, onRetryEnable, ...props }: Props) => {
  const time = new Date(date).getTime() - Date.now();

  useEffect(() => {
    const isExpired = checkExpiredTime(date);
    if (!isExpired) {
      onRetryEnable && onRetryEnable();
    }
  }, [date]);

  return <Countdown date={Date.now() + time} key={time} {...props} />;
};

export default CoundownTime;
