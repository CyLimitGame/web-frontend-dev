import React from 'react';
import { useTranslation } from 'next-i18next';
import { Center, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import { BsFillPlayBtnFill } from 'react-icons/bs';

import { BaseButton } from '@/components/Button';
import SaveIcon from '@/icons/SaveIcon';
import { BaseModal } from '@/components/Modal';
import { CylimitLogo, Text } from '@/components/Common';
import { useRedirectGameComming } from '@/queries/useGame';

const SaveAndFinishLaterButton = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate: redirectGameComming, isLoading } = useRedirectGameComming();

  const handleSaveAndFinishLater = async () => {
    onClose();
    redirectGameComming();
  };

  return (
    <React.Fragment>
      <BaseButton
        variant="outline"
        leftIcon={<SaveIcon />}
        onClick={onOpen}
        isLoading={isLoading}
      >
        {t('save_and_finish_later')}
      </BaseButton>
      <BaseModal
        title={
          <Center gap={1}>
            <Text translateText="alert" />
            <CylimitLogo w="120px" h="40px" />
          </Center>
        }
        isUseDrawerForMobile
        closeable
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <Flex direction="column">
          <Text
            translateText="you_can_complete_your_selection"
            textAlign="center"
          />
          <Center mt={2}>
            <BaseButton variant="light" size="xs" cursor="not-allowed">
              {t('claim_free_cards')}
            </BaseButton>
          </Center>
        </Flex>
        <Flex direction="column" mt={5}>
          <Text
            translateText="you_are_entitled_to_one_exchange_every_2_days"
            textAlign="center"
          />
          <Center mt={2}>
            <BaseButton
              rightIcon={<Icon as={BsFillPlayBtnFill} />}
              variant="light"
              size="xs"
              cursor="not-allowed"
            >
              {t('one_free_transfer')}
            </BaseButton>
          </Center>
        </Flex>
        <Center mt={10}>
          <BaseButton variant="light" onClick={handleSaveAndFinishLater}>
            {t('validate')}
          </BaseButton>
        </Center>
      </BaseModal>
    </React.Fragment>
  );
};

export default SaveAndFinishLaterButton;
