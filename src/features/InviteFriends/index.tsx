import React, { useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Icon,
  useClipboard,
  Image,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { HiArrowRight } from 'react-icons/hi';

import ShareModal from './ShareModal';

import MainLayout from '@/layouts/MainLayout';
import { INVITE_FRIENDS_BANNER_TEXT } from '@/constants/images';
import { Container, Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';

import { useGetUserProfile } from '@/queries/useUser';
import { useToastMessage } from '@/hooks/useToastMessage';

const InviteFriends = () => {
  const [visibleModalShare, setVisibleModalShare] = useState(false);
  // const [visibleModalConfirmPhone, setVisibleModalConfirmPhone] =
  //   useState(true);

  const { data } = useGetUserProfile();
  const toast = useToastMessage();

  const { onCopy } = useClipboard(data?.invitationCode || '');

  const { t } = useTranslation();

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
      <Container maxW="1240px">
        <Text
          textTransform="uppercase"
          translateText="play_with_your_friends"
          color="white"
          fontSize={['2xl', '2xl', '4xl']}
          fontWeight="bold"
          textAlign="center"
          maxWidth="580px"
          margin="auto"
          mt={['20px', '20px', '40px']}
        />
        <Box
          maxWidth="720px"
          margin="auto"
          mt="20px"
          mb={['20px', '20px', '40px']}
          px={2}
        >
          <Flex
            justifyContent="center"
            flexDirection={['column', 'column', 'row']}
            gap={2}
            pb={5}
          >
            <Flex
              gap={2}
              justifyContent="center"
              alignItems="center"
              direction={['column', 'row']}
            >
              <Flex
                py="10px"
                gap="10px"
                background="primary.500"
                borderRadius="xl"
                alignItems="center"
                px={4}
                border="1px solid white"
                flexDirection={['column', 'row']}
              >
                <Text
                  textTransform="uppercase"
                  translateText="invite_code"
                  fontWeight="bold"
                  fontSize={['sm', 'md']}
                  whiteSpace="nowrap"
                />

                <Divider
                  display={['none', 'block']}
                  orientation="vertical"
                  height="30px"
                  mx={4}
                  color="primary.300"
                />
                <Divider
                  display={['block', 'none']}
                  orientation="horizontal"
                  width="100%"
                  mx={4}
                  color="primary.300"
                />
                <Text
                  fontWeight="bold"
                  textAlign="center"
                  minW={['auto', 'auto', '270px']}
                >
                  {data?.invitationCode}
                </Text>
              </Flex>
              <BaseButton
                variant="secondaryLight"
                size={['sm', 'md', 'lg']}
                onClick={handleCopyCode}
              >
                {t('copy_code')}
              </BaseButton>
              <BaseButton
                variant="secondaryLight"
                size={['sm', 'md', 'lg']}
                onClick={() => setVisibleModalShare(true)}
              >
                {t('share')}
                <Icon as={HiArrowRight} ml={2} />
              </BaseButton>
            </Flex>
          </Flex>
        </Box>
        <Box pos="relative" w="100%" mb={['20px', '20px', '40px']} minH="100px">
          <Image aspectRatio="3.2" src={INVITE_FRIENDS_BANNER_TEXT} />
        </Box>
      </Container>
      <ShareModal
        isOpen={visibleModalShare}
        onClose={() => setVisibleModalShare(false)}
      />
      {/* <VerifyPhoneModal
        isOpen={visibleModalConfirmPhone}
        onClose={() => setVisibleModalConfirmPhone(false)}
      /> */}
    </MainLayout>
  );
};

export default InviteFriends;
