import React from 'react';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

import { RAMP_CONFIG } from '@/config/appConfig';
import { BaseButton } from '@/components/Button';
import { useGetUserProfile } from '@/queries/useUser';

type Props = {
  onToggle: () => void;
};

const RampButton = ({ onToggle }: Props) => {
  const { data: userProfile } = useGetUserProfile();

  const handleToggle = () => {
    onToggle();
    return new RampInstantSDK({
      ...RAMP_CONFIG,
      userAddress: userProfile?.walletAddress,
    }).show();
  };

  return (
    <BaseButton variant="light" onClick={handleToggle}>
      Ramp
    </BaseButton>
  );
};

export default RampButton;
