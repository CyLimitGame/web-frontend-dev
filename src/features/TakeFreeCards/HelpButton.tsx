import React, { useRef, useState } from 'react';
import { Box, Flex, Icon, IconButton, useDisclosure } from '@chakra-ui/react';
import { MdHelpOutline } from 'react-icons/md';
import Slider from 'react-slick';
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from 'react-icons/md';
import Image from 'next/image';
import _ from 'lodash';

import { BaseModal } from '@/components/Modal';
import { SKELETON } from '@/constants/images';
import { Text } from '@/components/Common';

const IMAGES = [
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/wc-1.png',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/wc-2.png',
  },
];

// TODO DELETE IN THE FUTURE
const HelpButton = () => {
  const sliderRef = useRef<any>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const settings = {
    afterChange: (index: number) => {
      setCurrentSlide(index);
    },
  };

  return (
    <React.Fragment>
      <Icon
        as={MdHelpOutline}
        fontSize="3xl"
        cursor="pointer"
        onClick={onOpen}
      />
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        closeable
        title="help"
        size="md"
      >
        <Box>
          <Slider
            ref={sliderRef}
            arrows={false}
            swipe={false}
            initialSlide={currentSlide}
            {...settings}
          >
            {_.map(IMAGES, (item, index) => (
              <Box borderRadius="md" overflow="hidden" w="100%" key={index}>
                <Image
                  src={item.img}
                  width="100%"
                  height="60px"
                  placeholder="blur"
                  blurDataURL={SKELETON}
                  sizes={`(max-width: 640px) 384px,
                  (max-width: 1080px) 384px,
                  (max-width: 1200px) 384px,
                  (max-width: 1920px) 384px,
                  384px`}
                />
              </Box>
            ))}
          </Slider>
        </Box>
        <Flex gap={2} mt={2} justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" color="gray.400">
            {`${currentSlide + 1} of ${_.size(IMAGES)}`}
          </Text>
          <Flex gap={2}>
            <IconButton
              aria-label="buton"
              isDisabled={currentSlide === 0}
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <Icon as={MdOutlineSkipPrevious} />
            </IconButton>
            <IconButton
              aria-label="buton"
              isDisabled={currentSlide === IMAGES.length - 1}
              onClick={() => sliderRef.current?.slickNext()}
            >
              <Icon as={MdOutlineSkipNext} />
            </IconButton>
          </Flex>
        </Flex>
      </BaseModal>
    </React.Fragment>
  );
};

export default HelpButton;
