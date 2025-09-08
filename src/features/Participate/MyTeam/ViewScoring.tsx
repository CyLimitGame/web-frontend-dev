import React from 'react';
import { useTranslation } from 'next-i18next';
import { useDisclosure } from '@chakra-ui/react';

import { BaseButton } from '@/components/Button';
import { useGameContext } from '@/features/Game/GameContext';
import { BaseModal } from '@/components/Modal';
import Rules from '@/features/Game/Rules';

type Props = {
  gameId: string;
};

const ViewScoring = ({ gameId }: Props) => {
  const { setGameContext } = useGameContext();
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleToggle = () => {
    onOpen();
    setGameContext({ gameId });
  };

  return (
    <>
      <BaseButton
        onClick={handleToggle}
        size={['md', 'md', 'lg']}
        variant="outline"
      >
        {t('cyLimit_scoring')}
      </BaseButton>
      <BaseModal isOpen={isOpen} onClose={onClose} size="6xl" closeable>
        <Rules gameId={gameId} />
      </BaseModal>
    </>
  );
};

export default ViewScoring;
