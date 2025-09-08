import React from 'react';
import { Box, Stack, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import InfomationModal from './InfomationModal';
import HistoryModal from './HistoryModal';

import { Kyc } from '@/features/core/Common';
import { BaseButton } from '@/components/Button';
import { useGetKycDetails } from '@/queries/useUser';
import { KycStatus } from '@/typings/user.enum';

const Withdraw = () => {
  const { t } = useTranslation();
  const {
    onClose: onCloseWithdraw,
    onOpen: onOpenWithdraw,
    isOpen: isOpenWithdraw,
  } = useDisclosure();

  const {
    onClose: onCloseHistory,
    onOpen: onOpenHistory,
    isOpen: isOpenHistory,
  } = useDisclosure();

  const { data: kycInfo } = useGetKycDetails();

  return (
    <Box>
      <Stack spacing={4}>
        {kycInfo?.status !== KycStatus.APPROVED && <Kyc />}
        <BaseButton
          variant="light"
          onClick={onOpenWithdraw}
          isDisabled={kycInfo?.status !== KycStatus.APPROVED}
        >
          {t('withdraw')}
        </BaseButton>
        <BaseButton variant="light" onClick={onOpenHistory}>
          {t('history')}
        </BaseButton>
      </Stack>
      <InfomationModal isOpen={isOpenWithdraw} onClose={onCloseWithdraw} />
      <HistoryModal isOpen={isOpenHistory} onClose={onCloseHistory} />
    </Box>
  );
};

export default Withdraw;
