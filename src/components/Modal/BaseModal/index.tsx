import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentProps,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Modal,
  ModalBodyProps,
  ModalCloseButton,
  ModalProps,
} from '@chakra-ui/modal';
import {
  ModalBody,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from '@chakra-ui/react';

import { Text } from '@/components/Common';
import breakpoints from '@/theme/foundations/breakpoints';

export type BaseModalProps = (ModalProps | DrawerProps) & {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  closeable?: boolean;
  isShowHeader?: boolean;
  isUseDrawerForMobile?: boolean;
  drawerContentProps?: DrawerContentProps;
  modalBodyProps?: ModalBodyProps;
  modalContentProps?: ModalContentProps;
};

const BaseModal = ({
  children,
  title,
  closeable,
  isShowHeader = true,
  isUseDrawerForMobile,
  drawerContentProps,
  modalBodyProps,
  modalContentProps = {},
  ...props
}: BaseModalProps) => {
  const [isMobileScreen] = useMediaQuery(`(max-width: ${breakpoints.md})`);
  if (isUseDrawerForMobile && isMobileScreen) {
    return (
      <Drawer placement="bottom" {...props}>
        <DrawerOverlay />
        <DrawerContent sx={{ borderTopRadius: 10 }} {...drawerContentProps}>
          {isShowHeader && title && (
            <DrawerHeader>
              {typeof title === 'string' ? (
                <Text textAlign="center" translateText={title} />
              ) : (
                title
              )}
            </DrawerHeader>
          )}
          {closeable && <DrawerCloseButton />}
          <DrawerBody p={[2, 2, 6]}>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent {...modalContentProps}>
        {isShowHeader && title && (
          <ModalHeader
            borderTopLeftRadius="20px"
            borderTopRightRadius="20px"
            sx={{ p: [2, 2, 3] }}
          >
            {typeof title === 'string' ? (
              <Text textAlign="center" translateText={title} />
            ) : (
              title
            )}
          </ModalHeader>
        )}
        {closeable && <ModalCloseButton />}
        <ModalBody
          borderTopRadius={isShowHeader ? '0' : '15px'}
          p={[2, 2, 6]}
          {...modalBodyProps}
        >
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BaseModal;
