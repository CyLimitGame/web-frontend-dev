import React from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
  Text,
  Divider,
  Stack,
  Link,
  Icon,
  Collapse,
} from '@chakra-ui/react';
import { MdOutlineMenu, MdClose } from 'react-icons/md';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { links, MainLink } from '../constant';

import Logo from '../Logo';

import { navigateTo } from '@/utils/navigation';
import { ClaimFreeCardsButton } from '@/features/core/Button';

type ItemProps = {
  item: MainLink;
  onToggle: () => void;
};

const Item = ({ item, onToggle }: ItemProps) => {
  const { t } = useTranslation();
  const { pathname } = useRouter();

  const handleNavigate = () => {
    const element = document.getElementById(`${item?.id}`);
    if (element) {
      onToggle();
      return element.click();
    }

    if (pathname !== item.path) {
      navigateTo(item.path);
    }
  };

  return (
    <Link _hover={{ textDecoration: 'none' }} onClick={handleNavigate}>
      <Flex
        py={2}
        alignItems="center"
        gap={2}
        fontWeight="medium"
        _hover={{ color: 'primary.500', fontWeight: 'bold' }}
        color="gray.500"
        borderRadius="sm"
        userSelect="none"
      >
        <Text textTransform="uppercase">{t(item.text)}</Text>
      </Flex>
    </Link>
  );
};

type SubMenuProps = {
  item: MainLink;
  onClose: () => void;
};

const SubMenu = ({ item, onClose }: SubMenuProps) => {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useDisclosure();

  const handleToggle = () => {
    if (!item.subs) {
      navigateTo(item.path);
    } else {
      onToggle();
    }
  };

  return (
    <>
      <Link _hover={{ textDecoration: 'none' }} onClick={handleToggle}>
        <Flex
          py={2}
          alignItems="center"
          gap={2}
          fontWeight="medium"
          _hover={{ color: 'primary.500', fontWeight: 'bold' }}
          color="gray.500"
          borderRadius="sm"
          userSelect="none"
        >
          <Text textTransform="uppercase">{t(item.text)}</Text>
        </Flex>
      </Link>
      {item.subs && (
        <Collapse
          in={isOpen}
          animateOpacity
          style={{ marginTop: 0, paddingLeft: 10 }}
          key={item.text}
        >
          {item.subs.map((elm) => (
            <Box key={elm.id}>
              <Item
                item={elm}
                onToggle={() => {
                  onClose();
                }}
              />
            </Box>
          ))}
        </Collapse>
      )}
    </>
  );
};

const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex alignItems="center">
        <Icon
          fontSize="2xl"
          cursor="pointer"
          onClick={onOpen}
          as={MdOutlineMenu}
        />
        <Logo w="120px" h="36px" ml={2} />
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Flex justifyContent="flex-end">
              <Icon as={MdClose} cursor="pointer" onClick={onClose} />
            </Flex>
          </DrawerHeader>
          <Divider />
          <DrawerBody>
            <Flex flexDirection="column" height="100%">
              <Box>
                <Stack spacing={2}>
                  {links.map((item) => (
                    <SubMenu item={item} key={item.text} onClose={onClose} />
                  ))}
                  <ClaimFreeCardsButton size="sm" />
                </Stack>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
