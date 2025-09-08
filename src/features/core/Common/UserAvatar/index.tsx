import React, { useMemo, useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  ComponentWithAs,
  IconProps,
} from '@chakra-ui/react';
import { MdKeyboardArrowDown, MdOutlineLogout } from 'react-icons/md';
import { IconType } from 'react-icons';
import Image from 'next/image';
import Link from 'next/link';

import { navigateToSignin } from '@/utils/navigation';
import { JerseyWithSponsor, Text } from '@/components/Common';
import { ProfileSettingIcon } from '@/icons';
import { ConfirmLogoutModal } from '@/features/core/Modal';
import { useGetUserProfile } from '@/queries/useUser';
import { removeTokenCookie } from '@/utils/cookies';
import { getFullName } from '@/utils/user';
import { PATH } from '@/constants/path';
import { Sponsor } from '@/typings/user.enum';
import BottleIcon from '@/icons/BottleIcon';

type MenuListItem = 'myProfile' | 'logout';

type MenuList = {
  id: MenuListItem;
  text: string;
  icon: IconType | ComponentWithAs<'svg', IconProps>;
  isProfile?: boolean;
  isUrl?: true;
  path?: string;
};

const menuList: MenuList[] = [
  {
    id: 'myProfile',
    text: 'my_profile',
    icon: ProfileSettingIcon,
    isProfile: true,
    isUrl: true,
    path: PATH.AWARDS,
  },
  {
    id: 'logout',
    text: 'logout',
    icon: MdOutlineLogout,
  },
];

type Props = {
  iconColor?: string;
};

const UserAvatar = ({ iconColor }: Props) => {
  const [visibleConfirmLogoutModal, setVisibleConfirmLogoutModal] =
    useState(false);

  const { data } = useGetUserProfile();

  const handleSubmitLogout = () => {
    setVisibleConfirmLogoutModal(false);
    removeTokenCookie();
    navigateToSignin();
  };

  const ownerImage = useMemo(() => {
    const commonProps = {
      width: ['30px', '40px'],
      height: ['30px', '40px'],
    };
    if (!data) return null;
    if (data?.jersey)
      return (
        <JerseyWithSponsor
          jersey={data?.jersey}
          primaryColor={data?.primaryColor || 'white'}
          secondaryColor={data?.secondaryColor || 'white'}
          sponsor={data?.sponsor as Sponsor}
          {...commonProps}
        />
      );
    if (data?.avatarUrl) {
      return (
        <Box {...commonProps}>
          <Image src={data?.avatarUrl} width="100%" height="100%" />
        </Box>
      );
    }
    return null;
  }, [data]);

  if (!data) {
    return null;
  }
  return (
    <React.Fragment>
      <Popover>
        <PopoverTrigger>
          <Flex alignItems="center" cursor="pointer">
            {ownerImage}
            <Icon as={MdKeyboardArrowDown} color={iconColor || 'primary.500'} />
          </Flex>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody p={0}>
            <Flex p={4} alignItems="center">
              {ownerImage}
              <Box ml={4}>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  maxWidth="200px"
                  whiteSpace="nowrap"
                >
                  {getFullName(data)}
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.400"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  maxWidth="200px"
                >
                  {data?.email}
                </Text>
              </Box>
            </Flex>

            {menuList.map((item, index) => {
              return item.isUrl ? (
                <Link href={item.path as string} key={index} passHref>
                  <Box as="a" userSelect="none" _hover={{ opacity: 0.5 }}>
                    <Divider />
                    <Flex alignItems="center" p={4} cursor="pointer">
                      <Icon as={item.icon} />
                      <Text translateText={item.text} ml={4} />
                      {item.isProfile && (
                        <Icon as={BottleIcon} fontSize="2xl" ml={2} />
                      )}
                    </Flex>
                  </Box>
                </Link>
              ) : (
                <Box
                  key={index}
                  cursor="pointer"
                  onClick={() => setVisibleConfirmLogoutModal(true)}
                  _hover={{ opacity: 0.5 }}
                >
                  <Divider />
                  <Flex alignItems="center" p={4}>
                    <Icon as={item.icon} />
                    <Text translateText={item.text} ml={4} />
                    {item.isProfile && (
                      <Icon as={BottleIcon} fontSize="2xl" ml={2} />
                    )}
                  </Flex>
                </Box>
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <ConfirmLogoutModal
        isOpen={visibleConfirmLogoutModal}
        onClose={() => setVisibleConfirmLogoutModal(false)}
        onSubmit={handleSubmitLogout}
      />
    </React.Fragment>
  );
};

export default UserAvatar;
