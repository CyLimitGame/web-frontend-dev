import React, { forwardRef, ReactElement } from 'react';
import { Box, Icon, IconButton } from '@chakra-ui/react';
import SliderSlick, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

import _ from 'lodash';

import colors from '@/theme/foundations/colors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NextArrow = ({ className, color = 'black', ...props }: any) => {
  return (
    <Box
      {...props}
      width="20px"
      height="20px"
      position="absolute"
      right="3"
      top="calc(50% - 20px)"
      zIndex="docked"
    >
      <IconButton
        aria-label=""
        isRound
        backgroundColor={`${colors.gray[200]}91`}
        backdropFilter="blur(2px)"
        shadow="lg"
      >
        <Icon as={MdOutlineKeyboardArrowRight} color={color} fontSize="2xl" />
      </IconButton>
    </Box>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PrevArrow = ({ className, color = 'black', ...props }: any) => {
  return (
    <Box
      {...props}
      width="20px"
      height="20px"
      position="absolute"
      left="-2"
      top="calc(50% - 20px)"
      zIndex="docked"
    >
      <IconButton
        aria-label=""
        isRound
        backgroundColor={`${colors.gray[200]}91`}
        backdropFilter="blur(2px)"
        shadow="lg"
      >
        <Icon as={MdOutlineKeyboardArrowLeft} color={color} fontSize="2xl" />
      </IconButton>
    </Box>
  );
};

type Props = Settings & {
  data: any[];
  renderItem: (record: any) => ReactElement;
  arrowColor?: string;
};

const Slider = forwardRef<Props, any>(
  ({ data, renderItem, arrowColor, ...props }, ref) => {
    return (
      <SliderSlick
        nextArrow={<NextArrow color={arrowColor} />}
        prevArrow={<PrevArrow color={arrowColor} />}
        swipe={false}
        ref={ref}
        {...props}
      >
        {_.map(data, (item, index) => (
          <Box key={item.id || index} my={2} height="100%">
            {renderItem(item)}
          </Box>
        ))}
      </SliderSlick>
    );
  }
);

export default Slider;
