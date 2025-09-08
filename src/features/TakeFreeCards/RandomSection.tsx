import React from 'react';
import { useTranslation } from 'next-i18next';
import { ButtonProps, Center, useDisclosure } from '@chakra-ui/react';

import { BaseButton } from '@/components/Button';
import { useAutoTakeFreeCard } from '@/queries/useCard';
import { BaseModal } from '@/components/Modal';
import { CylimitLogo, Text } from '@/components/Common';
import RandomSectionIcon from '@/icons/RandomSectionIcon';
import { useRedirectGameComming } from '@/queries/useGame';

const RandomSection = (props: ButtonProps) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutateAsync: autoTakeFreeCard, isLoading } = useAutoTakeFreeCard();
  const { mutate: redirectGameComming, isLoading: isLoadingRedirect } =
    useRedirectGameComming();

  const handleToggle = async () => {
    onClose();
    await autoTakeFreeCard();
    redirectGameComming();
  };

  return (
    <React.Fragment>
      <BaseButton
        variant="outline"
        onClick={onOpen}
        isLoading={isLoading || isLoadingRedirect}
        leftIcon={<RandomSectionIcon />}
        {...props}
      >
        {t('random_selection')}
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
        <Text
          translateText="remaining_cards_will_be_picked_randomly"
          fontSize="md"
          textAlign="center"
          fontWeight="bold"
        />
        <Text
          translateText="be_careful_this_choice"
          textAlign="center"
          mt={3}
        />
        <Text
          translateText="if_you_already_chose_some_riders"
          textAlign="center"
          mt={3}
        />
        <Center mt={10}>
          <BaseButton variant="light" onClick={handleToggle}>
            {t('validate')}
          </BaseButton>
        </Center>
      </BaseModal>
    </React.Fragment>
  );
};

export default RandomSection;
