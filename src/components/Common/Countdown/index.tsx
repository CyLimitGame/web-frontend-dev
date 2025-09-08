import React, { ReactNode } from 'react';
import ReactCountdown, {
  zeroPad,
  CountdownProps as RootCountdownProps,
} from 'react-countdown';

export type CountdownProps = RootCountdownProps & {
  date: string | number | Date;
  isIgnoreZeroTime?: boolean;
  renderCustom?: (time: string, props: RenderTimeProps) => ReactNode;
};

type RenderTimeProps = {
  hours: number;
  minutes: number;
  seconds: number;
  days: number;
  props: CountdownProps;
};

const RenderTime = ({
  days,
  hours,
  minutes,
  seconds,
  props,
}: RenderTimeProps) => {
  const { isIgnoreZeroTime, renderCustom } = props;
  let dateFormat = '';

  if (isIgnoreZeroTime && (days === 0 || hours === 0)) {
    if (days === 0) {
      dateFormat = `${zeroPad(hours)}h : ${zeroPad(minutes)}m : ${zeroPad(
        seconds
      )}s`;
    }
    dateFormat = `${zeroPad(minutes)}m : ${zeroPad(seconds)}s`;
  } else {
    dateFormat = `${zeroPad(days)}d : ${zeroPad(hours)}h : ${zeroPad(
      minutes
    )}m : ${zeroPad(seconds)}s`;
  }
  if (renderCustom)
    return renderCustom(dateFormat, {
      days,
      hours,
      minutes,
      seconds,
      props,
    });
  return <span>{dateFormat}</span>;
};

const Countdown = ({ date, ...props }: CountdownProps) => {
  return <ReactCountdown date={date} renderer={RenderTime} {...props} />;
};

export default Countdown;
