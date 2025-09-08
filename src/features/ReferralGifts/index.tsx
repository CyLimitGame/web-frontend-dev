import React from 'react';
import { Box, Card, Divider, Flex, Progress, Stack } from '@chakra-ui/react';

import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import MyProfileLayout from '@/layouts/MyProfileLayout';
import { NoResultFound, Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { getTemplatePath } from '@/utils/string';
import { useGetReferredRewards } from '@/queries/useAffiliate';
import { getFullName } from '@/utils/user';
import { useGetUserProfile } from '@/queries/useUser';
import { NftsPurchased } from '@/typings/affiliate';
import { AffiliateRewardStatusEnum } from '@/typings/affiliate.enum';

const ReferralGifts = () => {
  const { t } = useTranslation();
  const { data: profileInfo } = useGetUserProfile();
  const { data, isLoading } = useGetReferredRewards();

  const handleToggleClaim = (id: string) => {
    const URL = getTemplatePath(PATH.AFFILIATE_TAKE_REWARD, {
      rewardId: id,
    });
    navigateTo(URL);
  };

  const renderRewardButton = ({ count, reward }: NftsPurchased, id: string) => {
    const status = _.get(reward, 'status');
    if (count >= 4 && status === AffiliateRewardStatusEnum.CLAIMED) {
      return <BaseButton>{t('claimed')}</BaseButton>;
    }
    if (count >= 4 && status !== AffiliateRewardStatusEnum.CLAIMED) {
      return (
        <BaseButton onClick={() => handleToggleClaim(id)}>
          {t('claim_rewards')}
        </BaseButton>
      );
    }

    return <BaseButton>{t('inprogress')}</BaseButton>;
  };

  return (
    <MyProfileLayout>
      <Stack py={5} spacing={4}>
        {profileInfo?.refInvitationCode && (
          <React.Fragment>
            <Text
              translateText="my_referral_gift"
              fontWeight="bold"
              fontSize="2xl"
              textAlign="center"
            />
            {_.isEmpty(profileInfo?.nftsPurchased) ? (
              <Flex justifyContent="center">
                <NoResultFound type="common" />
              </Flex>
            ) : (
              <Card>
                <Flex p={4} gap={5} alignItems="center">
                  <Stack spacing={2} flex={1}>
                    <Text fontWeight="bold">{getFullName(profileInfo)}</Text>
                    <Progress
                      value={(profileInfo?.nftsPurchased.count as number) * 25}
                      colorScheme="green"
                    />
                    <Text>
                      {t('count_completed', {
                        count: profileInfo?.nftsPurchased.count,
                        total: 4,
                      })}
                    </Text>
                  </Stack>
                  <Box>
                    {renderRewardButton(
                      profileInfo?.nftsPurchased as NftsPurchased,
                      profileInfo?.id as string
                    )}
                  </Box>
                </Flex>
              </Card>
            )}
            <Divider />
          </React.Fragment>
        )}

        <Text
          translateText="friends_referral_gift"
          fontWeight="bold"
          fontSize="2xl"
          textAlign="center"
        />
        {_.isEmpty(data?.items) && !isLoading && (
          <Flex justifyContent="center">
            <NoResultFound type="common" />
          </Flex>
        )}
        {_.map(data?.items, (item) => (
          <Card key={item.id} bg="whiteAlpha.160">
            <Flex p={4} gap={5} alignItems="center">
              <Stack spacing={2} flex={1}>
                <Text fontWeight="bold">{getFullName(item)}</Text>
                <Progress
                  value={item.nftsPurchased.count * 25}
                  colorScheme="green"
                />
                <Text>
                  {t('count_completed', {
                    count: item.nftsPurchased.count,
                    total: 4,
                  })}
                </Text>
              </Stack>
              <Box>{renderRewardButton(item.nftsPurchased, item.id)}</Box>
            </Flex>
          </Card>
        ))}
      </Stack>
    </MyProfileLayout>
  );
};

export default ReferralGifts;
