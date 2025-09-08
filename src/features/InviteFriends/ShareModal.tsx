import React, { useEffect } from 'react';
import {
  Box,
  Divider,
  Flex,
  Icon,
  InputGroup,
  InputRightElement,
  useClipboard,
} from '@chakra-ui/react';
import { ModalProps } from '@chakra-ui/modal';
import { useTranslation } from 'next-i18next';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
} from 'react-share';

import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { BaseModal } from '@/components/Modal';
import { TextInput } from '@/components/Inputs';
import { useGetUserProfile } from '@/queries/useUser';
import { useToastMessage } from '@/hooks/useToastMessage';
import { getInviteUrl } from '@/utils/url';

type Props = Omit<ModalProps, 'children'>;

const ShareModal = (props: Props) => {
  const { t } = useTranslation();

  const { data } = useGetUserProfile();

  const inviteUrl = getInviteUrl(data?.invitationCode);

  const { onCopy, setValue } = useClipboard(inviteUrl);
  const toast = useToastMessage();

  const handleCopyUrl = () => {
    onCopy();
    toast({
      position: 'top-right',
      description: t('copied'),
      status: 'success',
    });
  };

  useEffect(() => {
    setValue(getInviteUrl(data?.invitationCode) || '');
  }, [data?.invitationCode]);

  return (
    <BaseModal title="share_to" isUseDrawerForMobile closeable {...props}>
      <Flex
        width="100%"
        height="50px"
        background="input"
        borderRadius="xl"
        alignItems="center"
        px={4}
      >
        <Text translateText="invite_code" fontWeight="bold" />
        <Divider
          orientation="vertical"
          height="30px"
          mx={4}
          color="primary.300"
        />
        <Text>{data?.invitationCode}</Text>
      </Flex>
      <InputGroup size="lg" mt={3}>
        <TextInput
          name="address"
          pr="6rem"
          placeholder={t('add_address')}
          width="100%"
          value={inviteUrl}
        />
        <InputRightElement width="6rem" right="-4px">
          <BaseButton size="md" variant="light" onClick={handleCopyUrl}>
            {t('copy')}
          </BaseButton>
        </InputRightElement>
      </InputGroup>
      <Flex mb={6} flexDirection="column" alignItems="center">
        <Text
          translateText="invite_your_friends_via"
          color="gray.400"
          my={4}
          textAlign="center"
        />
        <Flex>
          <Box mr={2}>
            <FacebookShareButton url={inviteUrl}>
              <Icon
                as={FacebookIcon}
                cursor="pointer"
                fill="red"
                width={50}
                height={50}
                borderRadius="50%"
                shadow="lg"
              />
            </FacebookShareButton>
          </Box>
          <Box>
            <EmailShareButton url={inviteUrl}>
              <Icon
                as={EmailIcon}
                cursor="pointer"
                fill="red"
                width={50}
                height={50}
                borderRadius="50%"
                shadow="lg"
              />
            </EmailShareButton>
          </Box>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ShareModal;
