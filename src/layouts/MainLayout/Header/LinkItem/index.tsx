import React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useTranslation } from 'next-i18next';
import { Menu, MenuButton, MenuItem, MenuList, Link } from '@chakra-ui/react';

import { MainLink } from '../constant';

import { Text } from '@/components/Common';
import { PATH } from '@/constants/path';

type Props = {
  item: MainLink;
  isSecondary?: boolean;
};

type MenuWithSubProps = {
  item: MainLink;
  color: string;
  fontWeight: string;
};

const MenuWithSub = ({ item, color, fontWeight }: MenuWithSubProps) => {
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuButton>
        <Text
          mr={10}
          translateText={item.text}
          color={color}
          fontWeight={fontWeight}
          fontStyle="italic"
          textTransform="uppercase"
        />
      </MenuButton>
      <MenuList p={2}>
        {item.subs?.map((subItem, index) => (
          <NextLink key={index} href={subItem.path} passHref>
            <MenuItem as="a" borderRadius="sm" textTransform="uppercase">
              {t(subItem.text)}
            </MenuItem>
          </NextLink>
        ))}
      </MenuList>
    </Menu>
  );
};

const LinkItem = ({ item, isSecondary }: Props) => {
  const { pathname } = useRouter();
  const { t } = useTranslation();

  const primaryColor = item.paths.includes(pathname) ? 'gray.200' : 'gray.200';
  const secondaryColor = 'white';
  const color = isSecondary ? secondaryColor : primaryColor;
  const fontWeight = item.paths.includes(pathname) ? 'bold' : 'normal';

  if (item.subs) {
    return <MenuWithSub item={item} color={color} fontWeight={fontWeight} />;
  }

  return (
    <NextLink href={item.path} passHref>
      <Link
        mr={9}
        fontWeight={fontWeight}
        color={color}
        fontStyle="italic"
        textTransform="uppercase"
        _hover={{
          textDecoration: 'none',
        }}
        target={item.path === PATH.HELP ? '_blank' : undefined}
        userSelect="none"
      >
        {t(item.text)}
      </Link>
    </NextLink>
  );
};

export default LinkItem;
