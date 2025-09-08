import { useEffect, useState } from 'react';

import { NEXT_PUBLIC_POLYGON_CHAIN } from '@/config/appConfig';
import {
  changeNetworkToPolygon,
  fetchAccounts,
  getChainId,
  sendUsdc,
} from '@/services/web3';

export const useWallet = () => {
  const [chainId, setChainId] = useState<number | null>();
  const [accountAddress, setAccountAddress] = useState('');

  useEffect(() => {
    const loadChain = async () => {
      if (window.ethereum) {
        const chain = await getChainId();
        return setChainId(chain);
      }
      return setChainId(null);
    };

    const loadAccountAddress = async () => {
      if (window.ethereum) {
        const address = await fetchAccounts();
        return setAccountAddress(address);
      }
      return setAccountAddress('');
    };

    loadChain();
    loadAccountAddress();
  }, []);

  return {
    changeNetworkToPolygon,
    sendUsdc,
    chainId,
    accountAddress,
    isAvailableWallet: chainId === NEXT_PUBLIC_POLYGON_CHAIN && accountAddress,
    ethereum: window.ethereum,
  };
};
