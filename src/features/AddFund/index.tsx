import React from 'react';
import { Box, Stack } from '@chakra-ui/react';

import { DepositUsdcButton, RampButton } from '@/features/core/Button';

import { Text } from '@/components/Common';

type Props = {
  onToggleRamp: () => void;
  onCloseModal: () => void;
};

const AddFund = ({ onToggleRamp, onCloseModal }: Props) => {
  return (
    <Box>
      <Stack spacing={2}>
        <Text translateText="with_local_currency" />
        {/* <MoonpayButton /> */}
        <RampButton onToggle={onToggleRamp} />
        {/* <Text translateText="with_eth_wallet" />
        <ConnectWalletButton /> */}
        <Text translateText="with_metamask_wallet" pt={2} />
        <DepositUsdcButton onCloseModal={onCloseModal} />
      </Stack>
    </Box>
  );
};

export default AddFund;
