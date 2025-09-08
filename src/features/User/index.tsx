import React, { useEffect, useMemo } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Flex,
  Icon,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FaDiscord } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

import CardData from './CardData';

import { CountCardByRarity } from '@/features/core/Common';
import Filter from '@/features/core/Cards/FilterCard';
import { sanitizeFilterCardRequest } from '@/features/core/Cards/FilterCard/actions';
import UnfollowButton from '@/features/core/Button/UnfollowButton';
import FollowButton from '@/features/core/Button/FollowButton';

import { useGetNftsByUser, useGetParamsCardFilter } from '@/queries/useCard';
import {
  JerseyWithSponsor,
  LoaderContainer,
  NoResultFound,
} from '@/components/Common';
import { MainLayout } from '@/layouts';
import {
  useDoesUserFollow,
  useGetProfileById,
  useGetUserProfile,
} from '@/queries/useUser';
import breakpoints from '@/theme/foundations/breakpoints';
import { MarketType } from '@/typings/card.enum';
import { getFullName, getUserBackGround } from '@/utils/user';
import { SpaceXIcon } from '@/icons';
import { useToastMessage } from '@/hooks/useToastMessage';
import { Sponsor } from '@/typings/user.enum';
import {
  BLUE_CARD,
  GRAY_CARD,
  RED_CARD,
  YELLOW_CARD,
} from '@/constants/images';

const User = () => {
  const { t } = useTranslation();
  const toast = useToastMessage();
  const { onCopy, setValue } = useClipboard('');
  const router = useRouter();
  const { id } = router.query;
  const isSale = _.get(router, 'query.isSale') === 'true';

  //<API>
  const { data: paramsCardFilter, isLoading: isLoadingCardParams } =
    useGetParamsCardFilter({
      ownerId: (id as string) || '',
      marketType: isSale ? MarketType.FIXED : undefined,
    });
  const { data: user } = useGetUserProfile();
  const { data: isFollowing } = useDoesUserFollow(id as string);
  const { data, isLoading } = useGetNftsByUser(
    id as string,
    sanitizeFilterCardRequest({
      router: router,
      riderOption: paramsCardFilter?.startListOfRiders || [],
      defaultFilter: { serialNumber: [0, 300] },
      addFiled: (values) => ({
        limit: Number.MAX_SAFE_INTEGER,
        marketType: _.get(values, 'isSale', false)
          ? MarketType.FIXED
          : undefined,
      }),
    })
  );
  const { data: owner } = useGetProfileById(id as string);
  // </API>
  const level = _.get(owner, 'level', 0);
  const twitterUsername = _.get(owner, 'twitter.username');
  const discordUsername = _.get(owner, 'discord.username');
  const discriminator = _.get(owner, 'discord.discriminator');
  const discordAccount = `${discordUsername}#${discriminator}`;

  useEffect(() => {
    setValue(discordAccount);
  }, [discordAccount]);

  const action = useMemo(() => {
    if (!user || !owner || user.id === owner.id) return null;
    if (!isFollowing) return <FollowButton id={owner?.id || ''} />;
    return <UnfollowButton id={id as string} />;
  }, [user, owner, isFollowing]);

  const ownerImage = useMemo(() => {
    const commonProps = {
      width: ['40px', '40px', '80px', '110px'],
      height: ['40px', '40px', '80px', '110px'],
    };
    if (!owner) return null;
    if (owner?.jersey)
      return (
        <JerseyWithSponsor
          jersey={owner?.jersey}
          primaryColor={owner?.primaryColor || 'white'}
          secondaryColor={owner?.secondaryColor || 'white'}
          sponsor={owner?.sponsor as Sponsor}
          {...commonProps}
        />
      );
    if (owner?.avatarUrl) {
      return (
        <Box {...commonProps}>
          <Image src={owner?.avatarUrl} width="100%" height="100%" />
        </Box>
      );
    }
    return null;
  }, [owner]);

  const handleCopyCode = () => {
    onCopy();
    toast({
      position: 'top-right',
      description: t('copied'),
      status: 'success',
    });
  };

  return (
    <MainLayout>
      <Box
        mb={10}
        borderBottom="1px solid"
        borderColor="border"
        background={getUserBackGround(owner, { isRevert: true })}
        pt={2}
      >
        <Container maxWidth={breakpoints['2xl']} px={[1, 2]}>
          <Flex
            flexDirection={['column', 'column', 'column', 'row']}
            gap={4}
            mb="20px"
          >
            <Box
              padding="20px"
              borderColor="white"
              borderStyle="solid"
              borderWidth={[0, 0, 0, 2]}
              borderRadius="20px"
            >
              <Flex
                flexDirection="column"
                gap={['8px', '8px', '12px', '16px']}
                alignItems="center"
              >
                {ownerImage}
                <Box>
                  <Text
                    textAlign="center"
                    fontWeight="bold"
                    fontSize={[20, 20, 28]}
                    wordBreak="break-all"
                  >
                    {getFullName(owner)}
                  </Text>
                  <Text
                    textAlign="center"
                    color="secondary.350"
                    textTransform="uppercase"
                    fontWeight="bold"
                    fontSize={[14, 14, 16]}
                  >
                    {t('level')} {level}
                  </Text>
                </Box>

                {action}
                <Flex gap="8px" justifyContent="center">
                  {discordUsername && (
                    <Flex
                      cursor="pointer"
                      w={['30px', '30px', '40px', '40px']}
                      h={['30px', '30px', '40px', '40px']}
                      borderRadius="full"
                      backgroundColor="white"
                      alignItems="center"
                      justifyContent="center"
                      onClick={handleCopyCode}
                    >
                      <Icon
                        w={['18px', '18px', '28px', '28px']}
                        h={['18px', '18px', '28px', '28px']}
                        as={FaDiscord}
                        color="purple.400"
                      />
                    </Flex>
                  )}
                  {twitterUsername && (
                    <Flex
                      cursor="pointer"
                      w={['30px', '30px', '40px', '40px']}
                      h={['30px', '30px', '40px', '40px']}
                      borderRadius="full"
                      backgroundColor="white"
                      alignItems="center"
                      justifyContent="center"
                      onClick={() =>
                        window.open(
                          `https://twitter.com/${twitterUsername}`,
                          '_blank'
                        )
                      }
                    >
                      <Icon
                        w={['18px', '18px', '28px', '28px']}
                        h={['18px', '18px', '28px', '28px']}
                        as={SpaceXIcon}
                      />
                    </Flex>
                  )}
                </Flex>
              </Flex>
              <Filter
                paramsCardFilter={paramsCardFilter}
                defaultFilter={{ serialNumber: [0, 300] }}
                components={{
                  Price: ({ form, defaultComponent }) => {
                    const isSale = form.watch('isSale');
                    if (!isSale) return <></>;
                    return defaultComponent;
                  },
                  SerialNumber: ({ defaultComponent }) => {
                    return React.cloneElement(defaultComponent, { min: 0 });
                  },
                  Rarity: ({ defaultComponent }) =>
                    React.cloneElement(defaultComponent, {
                      options: [
                        { image: BLUE_CARD, value: 'blue' },
                        { image: RED_CARD, value: 'pink' },
                        { image: YELLOW_CARD, value: 'yellow' },
                        { image: GRAY_CARD, value: 'white' },
                      ],
                    }),
                }}
              />
            </Box>
            <Box flex={1}>
              {id && (
                <Flex py={[2, 2, 4]} justifyContent="end">
                  <CountCardByRarity userId={id as string} />
                </Flex>
              )}
              <LoaderContainer
                isLoading={isLoading || isLoadingCardParams}
                notFoundComponent={<NoResultFound type="common" />}
                dataFound={data?.items || []}
              >
                <CardData isLoading={isLoading} data={data?.items || []} />
              </LoaderContainer>
            </Box>
          </Flex>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default User;
