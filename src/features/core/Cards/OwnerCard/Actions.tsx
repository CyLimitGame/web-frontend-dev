import React from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { useTranslation } from 'next-i18next';

import TransferXp from './TransferXp';

import { MyCardItem } from '@/typings/card';

type Props = {
  item: MyCardItem;
};

const Actions = ({ item }: Props) => {
  const { t } = useTranslation();
  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FiMoreVertical />}
        variant="outline"
        isDisabled={item.rarity === 'na'}
      />
      <MenuList>
        <TransferXp
          item={item}
          renderTarget={(onOpenModalTransferXp) => (
            <MenuItem onClick={onOpenModalTransferXp}>
              {t('transfer_xp')}
            </MenuItem>
          )}
        />
      </MenuList>
    </Menu>
  );
};

export default Actions;
