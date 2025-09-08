import React from 'react';
import {
  Flex,
  Box,
  Grid,
  GridItem,
  Stack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { SubscribeButton } from './SubscribeButton';

import { Container, Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { CYLIMIT_LOGO } from '@/constants/images';
import { GUIDE_LIST, NAVIGATE_LIST } from '@/constants/footer';
import { PATH } from '@/constants/path';
import { SocialList } from '@/features/core/Common';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Container marginBottom={10}>
      <Box borderWidth={1} borderRadius="xl">
        <Grid templateColumns="repeat(12, 1fr)" gap={[0, 2, 2, 4]}>
          <GridItem colSpan={[12, 6, 6, 4]}>
            <Flex
              px={6}
              py={[2, 6]}
              height="100%"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <Image src={CYLIMIT_LOGO} width="100" height="40" />
              </Box>
              <Box>
                <Link href={PATH.AWARDS} passHref>
                  <BaseButton variant="light" mt={2} as="a">
                    {t('my_account')}
                  </BaseButton>
                </Link>
                <Stack mt={4}>
                  {GUIDE_LIST.map((item, index) => (
                    <Link key={index} href={item.path} passHref>
                      <ChakraLink
                        cursor="pointer"
                        _hover={{ opacity: 0.5 }}
                        as="a"
                        target={item.path === PATH.HELP ? '_blank' : undefined}
                      >
                        {t(item.text)}
                      </ChakraLink>
                    </Link>
                  ))}
                </Stack>
              </Box>
            </Flex>
          </GridItem>
          <GridItem colSpan={[12, 6, 6, 3]}>
            <Flex
              px={6}
              py={[2, 6]}
              height="100%"
              flexDirection="column"
              justifyContent="space-between"
              border="1px solid transparent"
              borderColor={[
                'transparent',
                'transparent',
                'transparent',
                'border',
              ]}
              borderTopColor="transparent !important"
              borderBottomColor="transparent !important"
            >
              <Box>
                {NAVIGATE_LIST.map((item) => (
                  <Link key={item.text} href={item.path} passHref>
                    <ChakraLink
                      my={2}
                      as="a"
                      cursor="pointer"
                      _hover={{ opacity: 0.5 }}
                      display="block"
                    >
                      {t(item.text)}
                    </ChakraLink>
                  </Link>
                ))}
              </Box>
              <Link href="mailto:contact@cylimit.com" passHref>
                <ChakraLink _hover={{ opacity: 0.5 }} cursor="pointer">
                  {t('contact_us')}
                </ChakraLink>
              </Link>
              <SocialList />
            </Flex>
          </GridItem>
          <GridItem
            colSpan={[12, 12, 12, 5]}
            display={['none', 'none', 'none', 'block']}
          >
            <Flex
              height="100%"
              flexDirection="column"
              alignItems={[
                'flex-start',
                'flex-start',
                'flex-start',
                'flex-end',
              ]}
              justifyContent="space-between"
              p={[3, 3, 3, 6, 6]}
            >
              <Text
                fontSize="2xl"
                fontWeight="bold"
                maxWidth={286}
                textAlign={['left', 'left', 'left', 'right']}
                translateText="subscribe_now_to_our_newsletter"
              />
              <SubscribeButton />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default Footer;
