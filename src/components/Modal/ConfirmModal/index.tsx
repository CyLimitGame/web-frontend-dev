import React from 'react';
import { Flex, ModalProps } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { BaseModal } from '..';

import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';

type Props = Omit<ModalProps, 'children'> & {
  onSubmit: () => void;
  text?: string;
  title?: string;
  isUseDrawerForMobile?: boolean;
};

const ConfirmModal = ({
  onSubmit,
  text,
  title,
  isUseDrawerForMobile = true,
  ...props
}: Props) => {
  const { t } = useTranslation();

  const { onClose } = props;

  return (
    <BaseModal
      title={title || 'confirm'}
      isUseDrawerForMobile={isUseDrawerForMobile}
      closeable
      {...props}
    >
      <Text
        translateText={text || 'are_you_sure'}
        fontSize="md"
        textAlign="center"
        fontWeight="bold"
      />
      <Flex gap={2} mt={4}>
        <BaseButton flex={1} variant="light" onClick={onSubmit}>
          {t('yes')}
        </BaseButton>
        <BaseButton flex={1} onClick={onClose}>
          {t('no')}
        </BaseButton>
      </Flex>
    </BaseModal>
  );
};

export default ConfirmModal;
