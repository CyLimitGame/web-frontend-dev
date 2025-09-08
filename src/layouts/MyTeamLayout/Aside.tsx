import React from 'react';
import {
  Box,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  GridItem,
  Icon,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { MdFilterList } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { AvatarGradient, Text } from '@/components/Common';
import { useGetUserProfile } from '@/queries/useUser';
import { getFullName } from '@/utils/user';
import breakpoints from '@/theme/foundations/breakpoints';
import { PATH } from '@/constants/path';
import { BaseButton } from '@/components/Button';
import { formatPrice } from '@/utils/number';
import { ClaimCardsNotice } from '@/features/core/Common';

const MARGIN_TOP = 110;

type Props = {
  renderAsideContent?: () => React.ReactNode;
};

const Aside = ({ renderAsideContent }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useGetUserProfile();
  const [isLargerThan768] = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  const router = useRouter();
  const path = router.pathname;

  const renderContent = () => {
    return (
      <Box pt={10} px={6}>
        <Box textAlign="center">
          <AvatarGradient
            boxProps={{ p: 1 }}
            width="128"
            height="128"
            padding="8px"
            src={data?.avatarUrl || ''}
          />
          <Text fontSize="xl" fontWeight="bold" color="gray.900" mt={4}>
            {getFullName(data)}
          </Text>
          <Text fontSize="sm" color="gray.400" mt={2}>
            {data?.email}
          </Text>
          <Text fontWeight="bold" color="gray.500" mt={4}>
            {t('total_xp_value', {
              value: formatPrice(data?.totalXp as number, 3),
            })}
          </Text>
        </Box>
        <Divider mb={4} mt={6} />
        <ClaimCardsNotice />
        {renderAsideContent && renderAsideContent()}
      </Box>
    );
  };

  if (isLargerThan768) {
    return (
      <GridItem colSpan={1}>
        <Box
          height={`calc(100% + ${MARGIN_TOP}px)`}
          shadow="lg"
          borderRadius="xl"
          position="relative"
          top={`-${MARGIN_TOP}px`}
          width="280px"
          backgroundColor="white"
        >
          {renderContent()}
        </Box>
      </GridItem>
    );
  }

  return path === PATH.MY_CARDS ? (
    <React.Fragment>
      <BaseButton
        aria-label="filter"
        leftIcon={<Icon as={MdFilterList} />}
        pos="fixed"
        bottom={4}
        left="50%"
        zIndex="banner"
        onClick={onOpen}
        shadow="md"
        display={['block', 'block', 'block', 'none']}
        variant="light"
        transform="translateX(-50%)"
      >
        {t('filters')}
      </BaseButton>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <Box overflow="auto">{renderContent()}</Box>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  ) : null;
};

export default Aside;
