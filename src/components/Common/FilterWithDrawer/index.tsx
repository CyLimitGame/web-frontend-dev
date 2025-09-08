import React from 'react';
import {
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { MdFilterList } from 'react-icons/md';
import { useTranslation } from 'next-i18next';

import { BaseButton } from '@/components/Button';

type Props = {
  children: React.ReactNode;
  buttonProps?: ButtonProps;
};

const FilterWithDrawer = ({ children, buttonProps }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  return (
    <>
      <BaseButton
        aria-label="filter"
        leftIcon={<Icon as={MdFilterList} />}
        pos="fixed"
        bottom={4}
        left="50%"
        zIndex="banner"
        onClick={onOpen}
        shadow="md"
        variant="light"
        transform="translateX(-50%)"
        {...buttonProps}
      >
        {t('filters')}
      </BaseButton>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterWithDrawer;
