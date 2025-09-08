import React from 'react';
import { useTranslation } from 'next-i18next';

import { useDisclosure } from '@chakra-ui/react';

import { BaseButton } from '@/components/Button';
import { useDeleteTeam } from '@/queries/useGame';
import { ConfirmModal } from '@/components/Modal';

type Props = {
  teamId: string;
  onSuccess: () => void;
};

const DeleteTeamButton = ({ teamId, onSuccess }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useDeleteTeam();

  const handleSubmit = async () => {
    mutateAsync(teamId);
    onClose();
    onSuccess();
  };

  return (
    <>
      <BaseButton
        isLoading={isLoading}
        onClick={onOpen}
        variant="light"
        size={['sm', 'md', 'lg']}
      >
        {t('delete')}
      </BaseButton>
      <ConfirmModal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
    </>
  );
};

export default DeleteTeamButton;
