import React, { useState } from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

import { WalletModal } from '@/features/core/Modal';
import { useGetUserProfile } from '@/queries/useUser';

const WalletButton = (props: IconProps) => {
  const [visibleWalletModal, setVisibleWalletModal] = useState(false);
  const { data } = useGetUserProfile();

  if (!data) {
    return null;
  }

  return (
    <React.Fragment>
      <Icon
        as={MdOutlineAccountBalanceWallet}
        fontSize="xl"
        cursor="pointer"
        onClick={() => setVisibleWalletModal(true)}
        {...props}
      />
      <WalletModal
        isOpen={visibleWalletModal}
        onClose={() => setVisibleWalletModal(false)}
      />
    </React.Fragment>
  );
};

export default WalletButton;
