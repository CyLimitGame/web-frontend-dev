import React, { useEffect, useRef } from 'react';
import {
  chakra,
  shouldForwardProp,
  BoxProps,
  Box as CharkraBox,
  useMediaQuery,
} from '@chakra-ui/react';
import { AnimatePresence, motion, isValidMotionProp } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';

const Box = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

type Props = BoxProps & {
  children: React.ReactElement;
};

const CardAnimation = ({ children }: Props) => {
  const tiltRef = useRef<any>(null);
  const [isLessThan768] = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!isLessThan768) {
      VanillaTilt.init(tiltRef?.current, {
        max: 8,
        speed: 150,
      });
    }

    return () => {
      tiltRef?.current?.vanillaTilt?.destroy();
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLessThan768 ? (
        <Box
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          height="100%"
        >
          <CharkraBox
            transition="all .3s"
            borderRadius="3xl"
            height="100%"
            ref={tiltRef}
            data-tilt
            data-tilt-glare
            data-tilt-max-glare="0.8"
            _hover={{ shadow: 'md' }}
          >
            {children}
          </CharkraBox>
        </Box>
      ) : (
        <CharkraBox
          transition="all .3s"
          borderRadius="xl"
          height="100%"
          ref={tiltRef}
          data-tilt
          data-tilt-glare
          data-tilt-max-glare="0.8"
          _hover={{ shadow: 'md' }}
        >
          {children}
        </CharkraBox>
      )}
    </AnimatePresence>
  );
};

export default CardAnimation;
