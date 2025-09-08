import React from 'react';
import { ModalProps } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { Grid, GridItem } from '@chakra-ui/react';

import { Text } from '@/components/Common';
import { BaseModal } from '@/components/Modal';
import { BaseButton } from '@/components/Button';

type Props = Omit<ModalProps, 'children'> & {
  onSubmit: () => void;
};

const ModalConfirmLogout = ({ onSubmit, ...props }: Props) => {
  const { t } = useTranslation();

  const { onClose } = props;

  return (
    <BaseModal isShowHeader={false} isUseDrawerForMobile {...props}>
      <Text
        translateText="are_you_sure_you_want_to_log_out_of_this_account"
        fontWeight="bold"
        fontSize={['xl', 'xl', '3xl']}
        textAlign="center"
        maxW={['300px', '320px', '100%']}
        mx="auto"
      />
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
        <GridItem colSpan={1}>
          <BaseButton variant="light" width="100%" onClick={onSubmit}>
            {t('logout')}
          </BaseButton>
        </GridItem>
        <GridItem colSpan={1}>
          <BaseButton variant="outline" width="100%" onClick={onClose}>
            {t('cancel')}
          </BaseButton>
        </GridItem>
      </Grid>
    </BaseModal>
  );
};

export default ModalConfirmLogout;
