import React from 'react';
import { useTranslation } from 'next-i18next';
import { ButtonProps } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';

import { useCancelSell } from '@/queries/useSecondaryMarket';
import { useToastMessage } from '@/hooks/useToastMessage';
import { ConfirmModal } from '@/components/Modal';
import { BaseButton } from '@/components/Button';

type Props = ButtonProps & {
  id: string;
  onSuccess?: () => void;
};

const CancelListingButton = ({ id, disabled, onSuccess, ...props }: Props) => {
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useCancelSell();
  const toast = useToastMessage();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async () => {
    onClose();
    await mutateAsync(id);
    toast({
      title: t('success'),
      description: t('message:cancel_listing_success'),
      status: 'success',
    });
    onSuccess && onSuccess();
  };

  return (
    <React.Fragment>
      <BaseButton
        onClick={onOpen}
        variant="secondaryLight"
        isLoading={isLoading}
        isDisabled={disabled || isLoading}
        {...props}
      >
        {t('cancel_listing')}
      </BaseButton>
      <ConfirmModal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
    </React.Fragment>
  );
};

export default CancelListingButton;
