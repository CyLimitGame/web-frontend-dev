import React from 'react';
import { Icon, Tooltip, useDisclosure } from '@chakra-ui/react';
import { IoCheckmarkDone } from 'react-icons/io5';
import { useTranslation } from 'next-i18next';

import { ConfirmModal } from '@/components/Modal';
import { useMarkReadAllNotification } from '@/queries/useNotification';

const MarkReadAll = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { t } = useTranslation();

  const { mutate } = useMarkReadAllNotification();

  const handleSubmit = () => {
    mutate();
    onClose();
  };

  return (
    <>
      <Tooltip label={t('mark_read_all')}>
        <span>
          <Icon
            as={IoCheckmarkDone}
            cursor="pointer"
            _hover={{ color: 'success.500' }}
            onClick={onOpen}
          />
        </span>
      </Tooltip>
      <ConfirmModal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
    </>
  );
};

export default MarkReadAll;
