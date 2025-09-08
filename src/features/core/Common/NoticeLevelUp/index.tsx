import React from 'react';
import { Box, Center, Flex, Icon, useToast } from '@chakra-ui/react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { MdClose, MdUpload } from 'react-icons/md';

import {
  useGetUserLevels,
  useGetUserProfile,
  useUpdateUserProfile,
} from '@/queries/useUser';
import { CardImageLoader, Text } from '@/components/Common';
import { useListenLevelUp } from '@/queries/useLevel';
import { BaseButton } from '@/components/Button';
import LevelProgressBarWithBottle from '@/features/core/Common/LevelProgressBar/LevelProgressBarWithBottle';
import { BaseModal } from '@/components/Modal';

const NoticeLevelUp = () => {
  const toast = useToast();
  const { i18n, t } = useTranslation();
  const language = _.get(i18n, 'language', 'en');
  const [{ titleNotice, bidonNotice }, setNoticeBidons] = React.useState({
    titleNotice: '',
    bidonNotice: 0,
  });

  const { data: user, refetch } = useGetUserProfile();
  const { mutateAsync, isLoading } = useUpdateUserProfile({
    isShowToast: false,
  });
  const { data: levels } = useGetUserLevels();

  const findLevel = _.find(levels, (item) => item.level === user?.level);
  const nextLevel = _.find(
    levels,
    (item) => item.level === Number(user?.level) + 1
  );

  const [level, totalBidon, title, imageUrl] = [
    _.get(findLevel, 'level', 1),
    _.get(user, 'totalBidon', 0),
    _.get(findLevel, language === 'en' ? 'titleEn' : 'titleFr'),
    _.get(findLevel, language === 'en' ? 'imageUrlEn' : 'imageUrlFr'),
  ];

  const remainingBidon = nextLevel
    ? _.get(nextLevel, 'totalBidon', 0) - totalBidon
    : 0;

  const handleContinue = async () => {
    await mutateAsync({ isNewLevel: false });
    refetch();
  };

  React.useEffect(() => {
    if (bidonNotice) {
      setNoticeBidons({
        titleNotice: '',
        bidonNotice: 0,
      });
    }
  });

  useListenLevelUp({
    onSuccess: ({ bidon, quest }) => {
      refetch().then(() => {
        setNoticeBidons({
          titleNotice:
            quest?.quest?.replace(/-/g, '_').replace(/:/g, '_') ||
            (language === 'en' ? quest?.title1 : quest?.title2),
          bidonNotice: bidon,
        });
      });
    },
  });

  return (
    <>
      <BaseModal isOpen={!!user?.isNewLevel} onClose={handleContinue}>
        <Box>
          <Flex alignItems="center" justifyContent="center" gap={2}>
            <Text fontWeight="bold" fontSize="2xl" translateText="level_up" />
            <Icon as={MdUpload} fontSize="2xl" />
          </Flex>
          <Text fontSize="6xl" textAlign="center">
            🎉
          </Text>
          <Text
            fontWeight="bold"
            fontSize="3xl"
            textAlign="center"
            color="gray.600"
          >
            {t('level_value', { value: level })}
          </Text>

          <Text
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
            color="gray.400"
          >
            {t('congratulation')}
          </Text>
          <Flex gap={2} justifyContent="center">
            <Text fontSize="md" color="gray.500">
              {t('bidons_to_next_level')}:
            </Text>
            <Text fontWeight="bold" fontSize="md" color="gray.500">
              {remainingBidon}
            </Text>
          </Flex>
          {imageUrl && (
            <Center mt={4}>
              <CardImageLoader
                src={imageUrl as string}
                unoptimized={true}
                aspectRatio="2"
                w="100%"
              />
            </Center>
          )}
          {title && (
            <Text textAlign="center" mt={4} fontSize="sm">
              {title}
            </Text>
          )}
          <Center mt={5}>
            <BaseButton
              isLoading={isLoading}
              variant="light"
              onClick={handleContinue}
            >
              {t('continue')}
            </BaseButton>
          </Center>
        </Box>
      </BaseModal>
      {bidonNotice > 0 &&
        toast({
          position: 'bottom-right',
          status: 'success',
          isClosable: true,
          duration: 30 * 1000,
          render: (props) => (
            <Flex
              gap={4}
              p={4}
              cursor="pointer"
              alignItems="center"
              bg="blue.400"
              borderRadius="md"
              pos="relative"
            >
              <Icon
                as={MdClose}
                pos="absolute"
                top="8px"
                right="8px"
                onClick={(e) => {
                  e.stopPropagation();
                  props.onClose();
                }}
              />
              <Flex
                flex="4px"
                justifyContent="flex-end"
                alignItems="center"
                gap={4}
              >
                <Box>
                  <Text fontWeight="bold" textAlign="right">
                    {t(titleNotice)}
                  </Text>
                  <Text fontWeight="bold" textAlign="right">
                    +{bidonNotice} {bidonNotice > 1 ? 'bidons' : 'bidon'}
                  </Text>
                  <LevelProgressBarWithBottle
                    value={totalBidon}
                    total={remainingBidon + totalBidon}
                    level={level}
                    my="10px"
                    w="100%"
                    minW="300px"
                  />
                </Box>
              </Flex>
            </Flex>
          ),
        })}
    </>
  );
};

export default NoticeLevelUp;
