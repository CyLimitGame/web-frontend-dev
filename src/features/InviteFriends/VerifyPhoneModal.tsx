import React from 'react';
import { ModalProps } from '@chakra-ui/modal';
import { Box, Flex, PinInput, PinInputField } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { BaseModal } from '@/components/Modal';
import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';

type Props = Omit<ModalProps, 'children'>;

const VerifyPhoneModal = (props: Props) => {
  const { t } = useTranslation();

  return (
    <BaseModal title="verify_phone_number" closeable {...props}>
      <Box textAlign="center">
        <Text fontSize="xl">
          {t('check_your_sms_message')}{' '}
          <span style={{ fontWeight: 'bold' }}>+33738838</span>
        </Text>
        <Box pt={8} pb={4} textAlign="center">
          <PinInput size="lg">
            <PinInputField mx={1} shadow="lg" />
            <PinInputField mx={1} shadow="lg" />
            <PinInputField mx={1} shadow="lg" />
            <PinInputField mx={1} shadow="lg" />
            <PinInputField mx={1} shadow="lg" />
            <PinInputField mx={1} shadow="lg" />
          </PinInput>
        </Box>
        <Flex justifyContent="center" alignItems="center" mb={6}>
          <Text translateText="dont_receive_sms" mr={2} />
          <Text color="primary.500" fontWeight="bold" cursor="pointer">
            {t('resend_code')}
          </Text>
        </Flex>
        <BaseButton
          backgroundColor="gray.400"
          color="white"
          width="300px"
          mb={4}
        >
          {t('verify')}
        </BaseButton>
      </Box>
    </BaseModal>
  );
};

export default VerifyPhoneModal;
