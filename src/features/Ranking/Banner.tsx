import React from 'react';
import { Avatar, Box, Flex, Image } from '@chakra-ui/react';
import _ from 'lodash';

import {
  TOUR_BANNER,
  // FLOWER_ANIMATED,
  WATCH_RANKING_1,
  WATCH_RANKING_2,
  WATCH_RANKING_3,
} from '@/constants/images';
import {
  Container,
  ShowAnimation,
  Text,
  TextOneLine,
} from '@/components/Common';
import { useGetGameRankings } from '@/queries/useGame';
import { formatPrice } from '@/utils/number';
import { NEXT_PUBLIC_GAME_RANKING_BACKGROUND } from '@/config/appConfig';
import { getFullName } from '@/utils/user';
import useParamsQuery from '@/hooks/useGetParams';

type Props = {
  gameId: string;
  divisionId: string;
  name: string;
};

const Banner = ({ gameId, divisionId, name }: Props) => {
  const { getParam } = useParamsQuery();
  const isFriend = getParam('isFriend');

  const { data } = useGetGameRankings({
    gameId,
    divisionId,
    page: 1,
    limit: 3,
    isFriend: isFriend === 'true' ? true : undefined,
  });

  const firstUser = _.get(data, 'items[0]', {});
  const secondUser = _.get(data, 'items[1]', {});
  const thirdUser = _.get(data, 'items[2]', {});

  const avatarProps = {
    boxSize: '78px',
    borderRadius: 'full',
    left: '50%',
    top: '-45px',
    transform: 'translateX(-50%)',
    border: '4px solid',
  };

  const isShowTop = _.size(_.get(data, 'items', [])) >= 3;
  const BANNER =
    name === 'TOUR' ? TOUR_BANNER : NEXT_PUBLIC_GAME_RANKING_BACKGROUND;

  return (
    <Container
      height="400px"
      bg="primary.50"
      maxW="1400px"
      mt={10}
      position="relative"
      backgroundImage={`url(${BANNER})`}
      backgroundSize="cover"
      borderRadius="md"
      display={['none', 'none', 'none', 'block']}
    >
      {/* <BackgroundAnimation
        src={FLOWER_ANIMATED}
        position="absolute"
        width="400px"
        height="400px"
        left="calc(50% - 200px)"
      />
      <BackgroundAnimation
        src={FLOWER_ANIMATED}
        position="absolute"
        width="400px"
        height="400px"
        left="-200px"
      />
      <BackgroundAnimation
        src={FLOWER_ANIMATED}
        position="absolute"
        width="400px"
        height="400px"
        right="-200px"
      /> */}

      {isShowTop && (
        <ShowAnimation
          display="flex"
          alignItems="flex-end"
          height="100%"
          justifyContent="center"
          pb={10}
        >
          <Box position="relative">
            <Avatar
              {...avatarProps}
              position="absolute"
              src={_.get(secondUser, 'createdBy.avatarUrl')}
              borderColor="secondary.350"
            />
            <Flex
              alignItems="center"
              justifyContent="center"
              fontSize="3xl"
              position="absolute"
              width="100%"
              pt={12}
            >
              <Flex
                width="42px"
                height="42px"
                justifyContent="center"
                alignItems="center"
                bg="white"
                fontWeight="bold"
                borderRadius="full"
                shadow="lg"
                mr={2}
              >
                2
              </Flex>
              <Text fontWeight="bold" color="gray.900">
                {formatPrice(_.get(secondUser, 'totalPoint', 0))}
              </Text>
            </Flex>
            <TextOneLine
              pt={24}
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
              width="90%"
              fontWeight="medium"
              textAlign="center"
              value={`${getFullName(_.get(secondUser, 'createdBy'))}`}
            />
            <Image src={WATCH_RANKING_2} />
          </Box>
          <Box mx={5} position="relative">
            <Avatar
              {...avatarProps}
              boxSize="90px"
              position="absolute"
              src={_.get(firstUser, 'createdBy.avatarUrl')}
              borderColor="pink.300"
            />
            <Flex
              alignItems="center"
              justifyContent="center"
              fontSize="3xl"
              position="absolute"
              width="100%"
              pt={12}
            >
              <Flex
                width="42px"
                height="42px"
                justifyContent="center"
                alignItems="center"
                bg="white"
                fontWeight="bold"
                borderRadius="full"
                shadow="lg"
                mr={2}
              >
                1
              </Flex>
              <Text fontWeight="bold">
                {formatPrice(_.get(firstUser, 'totalPoint', 0))}
              </Text>
            </Flex>
            <TextOneLine
              pt={24}
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
              width="90%"
              fontWeight="medium"
              textAlign="center"
              value={`${getFullName(_.get(firstUser, 'createdBy'))}`}
            />
            <Image src={WATCH_RANKING_1} />
          </Box>
          <Box position="relative">
            <Avatar
              {...avatarProps}
              src={_.get(thirdUser, 'createdBy.avatarUrl')}
              position="absolute"
              borderColor="secondary.350"
            />
            <Flex
              alignItems="center"
              justifyContent="center"
              fontSize="3xl"
              position="absolute"
              width="100%"
              pt={12}
            >
              <Flex
                width="42px"
                height="42px"
                justifyContent="center"
                alignItems="center"
                bg="white"
                fontWeight="bold"
                borderRadius="full"
                shadow="lg"
                mr={2}
              >
                3
              </Flex>
              <Text fontWeight="bold" color="gray.900">
                {formatPrice(_.get(thirdUser, 'totalPoint', 0))}
              </Text>
            </Flex>
            <TextOneLine
              pt={24}
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
              width="90%"
              fontWeight="medium"
              textAlign="center"
              value={`${getFullName(_.get(thirdUser, 'createdBy'))}`}
            />
            <Image src={WATCH_RANKING_3} />
          </Box>
        </ShowAnimation>
      )}
    </Container>
  );
};

// const BackgroundAnimation = styled(Image)`
//   animation: spin 8s linear infinite;
//   @keyframes spin {
//     100% {
//       transform: rotate(360deg);
//     }
//   }
// `;

export default Banner;
