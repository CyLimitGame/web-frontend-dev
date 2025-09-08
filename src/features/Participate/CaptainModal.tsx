import React from 'react';
import _ from 'lodash';
import { Box, Center, Icon } from '@chakra-ui/react';
import { ImArrowLeft } from 'react-icons/im';

import BaseModal, { BaseModalProps } from '@/components/Modal/BaseModal';
import {
  AvgCapScoreAndBonus,
  CardImageLoader,
  Text,
} from '@/components/Common';
import { NO_CARD } from '@/constants/images';
import { useGetUserProfile, useUpdateUserProfile } from '@/queries/useUser';

type Props = Omit<BaseModalProps, 'children'> & {
  captain: any;
  captainId: string;
};

const CaptainModal = ({ captain, captainId, onClose, ...props }: Props) => {
  const imageUrl = _.get(captain, 'imageUrl');
  const { data: user } = useGetUserProfile();
  const { mutate } = useUpdateUserProfile({ isShowToast: false });

  const handleClose = () => {
    onClose();
    if (!user?.isUnderstandingCaptainRule && captainId) {
      mutate({ isUnderstandingCaptainRule: true });
    }
  };

  return (
    <BaseModal {...props} onClose={handleClose} closeable size="xl">
      <Center flexDirection="column">
        {!captainId && (
          <Text
            translateText="please_select_your_captain"
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
          />
        )}
        <Text
          translateText="the_captain_getsscore_bonus"
          fontSize="2xl"
          fontWeight="bold"
          maxW="320px"
          mx="auto"
          textAlign="center"
          mt={2}
          mb={5}
        />
        <Box w="120px" pos="relative">
          <Icon
            as={ImArrowLeft}
            pos="absolute"
            right="-60px"
            top="-20px"
            fontSize="4xl"
          />
          <Center
            pos="absolute"
            top="-6px"
            right="-6px"
            zIndex="docked"
            border="2px solid"
            w="30px"
            h="30px"
            fontWeight="bold"
            borderRadius="2xl"
            borderColor="white"
            bg="background.default"
          >
            <Text color="white">C</Text>
          </Center>
          <CardImageLoader src={imageUrl || NO_CARD} />
          <Box mt={4}>
            <AvgCapScoreAndBonus item={captain} />
          </Box>
        </Box>
      </Center>
    </BaseModal>
  );
};

export default CaptainModal;
