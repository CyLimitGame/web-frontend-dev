import Web3 from 'web3';

import {
  NEXT_PUBLIC_POLYGON_CHAIN,
  NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
  NEXT_PUBLIC_USDC_DECIMAL,
} from '@/config/appConfig';
import { CHAINS } from '@/config/chain';
import { Chain } from '@/typings/network.enum';

const TRANSFER_FUNCTION_ABI = {
  constant: false,
  inputs: [
    { name: '_to', type: 'address' },
    { name: '_value', type: 'uint256' },
  ],
  name: 'transfer',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
};

export const changeNetworkToPolygon = async () => {
  const { ethereum } = window;

  const network = CHAINS[NEXT_PUBLIC_POLYGON_CHAIN as Chain];

  try {
    const result = await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: Web3.utils?.toHex(network.chainId) }],
    });
    return result;
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if ([4902, -32603].includes(switchError.code)) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: Web3.utils?.toHex(network.chainId),
              chainName: network.name,
              nativeCurrency: network.nativeCurrency,
              rpcUrls: network.rpc,
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
        // handle "add" error
      }
    }
  }
};

const getDataFieldValue = (
  tokenRecipientAddress: string,
  tokenAmount: string
) => {
  const web3 = new Web3();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return web3.eth.abi.encodeFunctionCall(TRANSFER_FUNCTION_ABI, [
    tokenRecipientAddress,
    tokenAmount,
  ]);
};

export const sendUsdc = async (to: string, value: string) => {
  const { ethereum } = window;

  const from = await fetchAccounts();

  const transactionParameters = {
    from: from,
    to: NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
    data: getDataFieldValue(
      to,
      (Number(value) * 10 ** Number(NEXT_PUBLIC_USDC_DECIMAL)).toString()
    ),
  };

  return ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
  });
};

export const fetchAccounts = async (): Promise<string> => {
  const { ethereum } = window;
  const web3 = new Web3(ethereum);

  try {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  } catch (e) {
    console.log(e);
    return '';
  }
};

export const getChainId = async () => {
  const { ethereum } = window;
  const web3 = new Web3(ethereum);

  return web3.eth.getChainId();
};
