import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Menu, MenuButton, MenuItem, MenuList, Image } from '@chakra-ui/react';

import { EN_FLAG, FR_FLAG } from '@/constants/images';

const MAP_FLAG = {
  en: EN_FLAG,
  fr: FR_FLAG,
};

export const SwitchLang = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const locale = _.get(router, 'locale', 'en');

  const changeLanguage = (locale: any) => {
    const { pathname, query } = router;
    const regex = new RegExp(`^/(${i18n.languages.join('|')})`);
    const newUrl = pathname.replace(regex, `/${locale}`);

    router.push({ pathname: newUrl, query }, undefined, { locale });
  };

  return (
    <Menu>
      <MenuButton transition="all 0.2s" borderRadius="md">
        <Image src={_.get(MAP_FLAG, locale)} width="24px" height="24px" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
        <MenuItem onClick={() => changeLanguage('fr')}>Français</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SwitchLang;
