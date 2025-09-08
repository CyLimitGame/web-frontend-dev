import React, { useEffect, useRef, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  Box,
  Flex,
  IconButton,
  Icon,
  useDisclosure,
  PopoverCloseButton,
} from '@chakra-ui/react';
import _ from 'lodash';
import Slider from 'react-slick';
import { FiHelpCircle } from 'react-icons/fi';
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from 'react-icons/md';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import SwitchLang from './SwitchLang';

import { BaseButton } from '@/components/Button';
import { Text } from '@/components/Common';
import { SKELETON } from '@/constants/images';

// LOCAL STORAGE
const KEY = 'TUTORIAL_GUIDE';
const getTutorial = (): Tutorial => {
  if (typeof window === 'undefined') {
    return { currentSlide: 0, isFinished: false };
  }
  return JSON.parse(localStorage.getItem(KEY) || '{}');
};
export const saveTutorial = (data: Tutorial) => {
  const currentValues = getTutorial();
  return localStorage.setItem(
    KEY,
    JSON.stringify({ ...currentValues, ...data })
  );
};

type Tutorial = {
  currentSlide?: number;
  isFinished?: boolean;
  isFirstLogin?: boolean;
  autoShow?: boolean;
  lang?: string;
};

const EN_IMGS = [
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-1.png',
    route: '/',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-2.png',
    route: '/',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-3.png',
    route: '/game',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-4.png',
    route: '/game',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-5.png',
    route: '/game',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-6.png',
    route: '/game',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-7.png',
    route: '/market?age=7&age=85&marketType=auction&filterBy=new_cards&page=1',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-8.png',
    route: '/market?age=7&age=85&marketType=fixed&filterBy=best_value&page=1',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-9.png',
    route:
      '/market?age=7&age=85&rarity=blue&marketType=fixed&filterBy=best_value&page=1',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-10.png',
    route:
      '/market?age=7&age=85&rarity=pink&marketType=fixed&filterBy=best_value&page=1',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-11.png',
    route:
      '/market?age=7&age=85&rarity=yellow&marketType=fixed&filterBy=best_value&page=1',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-12.png',
    route: '/my-team/my-cards',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-13.png',
    route: '/game',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/En-14.png',
    route: '/game',
  },
];

const FR_IMGS = [
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/1-1.png',
    route: '/fr',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/2-1.png',
    route: '/fr',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/3-1.png',
    route: '/fr/game',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/4-1.png',
    route: '/game',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/5-1.png',
    route: '/fr/game',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/6-1.png',
    route: '/fr/game',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/7-1.png',
    route:
      '/fr/market?age=7&age=85&marketType=auction&filterBy=new_cards&page=1',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/8-1.png',
    route:
      '/fr/market?age=7&age=85&marketType=fixed&filterBy=best_value&page=1',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/9-1.png',
    route:
      '/fr/market?age=7&age=85&rarity=blue&marketType=fixed&filterBy=best_value&page=1',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/10-1.png',
    route:
      '/fr/market?age=7&age=85&rarity=pink&marketType=fixed&filterBy=best_value&page=1',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/11-1.png',
    route:
      '/fr/market?age=7&age=85&rarity=yellow&marketType=fixed&filterBy=best_value&page=1',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/12-1.png',
    route: '/fr/my-team/my-cards',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/13-1.png',
    route: '/fr/game',
  },
  {
    img: 'https://cylimit-public.s3.eu-west-3.amazonaws.com/asset/Tutorial/14-1.png',
    route: '/fr/game',
  },
];

// TODO Delete feature
const TutorialButton = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState(_.get(getTutorial(), 'lang', 'fr'));

  const IMAGES = lang === 'en' ? EN_IMGS : FR_IMGS;

  const sliderRef = useRef<any>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isFirstLogin = _.get(getTutorial(), 'isFirstLogin');
  const isFinished = _.get(getTutorial(), 'isFinished');
  const autoShow = _.get(getTutorial(), 'autoShow');

  const settings = {
    afterChange: (index: number) => {
      setCurrentSlide(index);
      if (IMAGES[currentSlide].route !== IMAGES[index].route) {
        window.location.href = IMAGES[index].route;
        saveTutorial({ currentSlide: index, autoShow: true });
      }
    },
  };

  const handleSkip = () => {
    saveTutorial({ currentSlide, isFinished: true, autoShow: false });
    handleClose();
  };

  const handleStart = () => {
    setCurrentSlide(0);
    sliderRef.current.slickGoTo(0);
    saveTutorial({ currentSlide: 0, autoShow: true });
    if (IMAGES[currentSlide].route !== IMAGES[0].route) {
      window.location.href = IMAGES[0].route;
    }
  };

  const handleClose = () => {
    onClose();
    saveTutorial({ isFirstLogin: false, autoShow: false });
  };

  const handleChangeLang = (value: string) => {
    setLang(value);
    saveTutorial({ lang: value });
  };

  useEffect(() => {
    if (sliderRef.current && window) {
      const tutorial = getTutorial();
      setCurrentSlide(tutorial.currentSlide || 0);
      sliderRef.current.slickGoTo(tutorial.currentSlide || 0);
    }
  }, [sliderRef]);

  useEffect(() => {
    if ((isFirstLogin && !isFinished) || autoShow) {
      onOpen();
    }
  }, [isFirstLogin, isFinished, autoShow]);

  return (
    <React.Fragment>
      <Popover isOpen={isOpen}>
        <PopoverTrigger>
          <Flex role="button" aria-label="Some box" onClick={onOpen}>
            <Icon as={FiHelpCircle} fontSize="xl" />
          </Flex>
        </PopoverTrigger>
        <PopoverContent sx={{ w: ['375px', '420px', '500px'] }}>
          <PopoverHeader fontWeight="bold">
            <Flex justifyContent="space-between" pr={8}>
              <Text>{t('tutorial_guide')}</Text>
              <SwitchLang onChange={handleChangeLang} />
            </Flex>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton onClick={handleClose} />
          <PopoverBody>
            <Slider
              ref={sliderRef}
              arrows={false}
              swipe={false}
              initialSlide={_.get(getTutorial(), 'currentSlide', 0)}
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
            <Flex
              gap={2}
              mt={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontWeight="bold" color="gray.400">
                {`${currentSlide + 1} of 14`}
              </Text>
              <Flex gap={2}>
                <BaseButton size="md" onClick={handleStart}>
                  {t('start')}
                </BaseButton>
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
                <BaseButton size="md" onClick={handleSkip}>
                  {t(currentSlide === IMAGES.length - 1 ? 'continue' : 'skip')}
                </BaseButton>
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </React.Fragment>
  );
};

export default TutorialButton;
