import React, { useState } from 'react';
import { Box, useDisclosure, Icon, Flex } from '@chakra-ui/react';
import { MdKeyboardArrowRight } from 'react-icons/md';

import Step1 from './Step1';
import Step2 from './Step2';
import Success from './Success';

import { BaseModal } from '@/components/Modal';
import { Text } from '@/components/Common';
import { useGetKycDetails } from '@/queries/useUser';
import { KycStatus } from '@/typings/user.enum';

const Kyc = () => {
  const [step, setStep] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: kycInfo } = useGetKycDetails();

  return (
    <>
      <Flex
        border="1px solid white"
        borderRadius="xl"
        p={3}
        bg="input"
        cursor="pointer"
        onClick={onOpen}
        textAlign="center"
        textTransform="initial"
        fontSize="sm"
        _hover={{ opacity: '0.8' }}
      >
        <Box flex={1}>
          <Text translateText="to_be_able_to_withdraw" />
          {kycInfo?.status === KycStatus.REJECTED && (
            <Text translateText="your_id_has_been_refused" color="error.500" />
          )}
        </Box>
        <Box w="20px">
          <Icon as={MdKeyboardArrowRight} fontSize="xl" />
        </Box>
      </Flex>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        modalContentProps={{
          sx: {
            overflow: 'visible',
            '.chakra-modal__body': { borderRadius: '20px' },
          },
        }}
        closeable
      >
        {step === 1 && <Step1 onSubmit={() => setStep(2)} />}
        {step === 2 && (
          <Step2 onBack={() => setStep(1)} onSuccess={() => setStep(3)} />
        )}
        {step === 3 && <Success onSubmit={onClose} />}
      </BaseModal>
    </>
  );
};

export default Kyc;
