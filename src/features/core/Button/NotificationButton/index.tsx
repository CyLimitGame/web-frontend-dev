import React from 'react';
import {
  Box,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import moment from 'moment';
import _ from 'lodash';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';

import MarkReadAll from './MarkReadAll';

import { Loader, NoResultFound, Text, TextOneLine } from '@/components/Common';
import {
  useGetNotifications,
  useGetUnreadNotifications,
  useListenNotification,
  useMarkReadNotification,
} from '@/queries/useNotification';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { getTemplatePath } from '@/utils/string';
import { CYLIMIT_AVATAR } from '@/constants/images';
import { Notification } from '@/typings/notification';

const AnnoucementButton = () => {
  const toast = useToast();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetNotifications();
  const { data: unread } = useGetUnreadNotifications();

  const { mutateAsync } = useMarkReadNotification();

  // LISTEN SCHEDULE NOTIFICATION
  useListenNotification({
    onSuccess: (data) =>
      toast({
        position: 'bottom-right',
        status: 'success',
        isClosable: true,
        duration: 60 * 1000 * 10,
        render: (props) => (
          <Flex
            gap={4}
            p={4}
            cursor="pointer"
            alignItems="center"
            onClick={() => {
              props.onClose();
              handleNavigation(data);
            }}
            bg="blue.400"
            borderRadius="md"
            pos="relative"
          >
            <Icon
              as={MdClose}
              pos="absolute"
              top="8px"
              right="8px"
              onClick={(e) => {
                e.stopPropagation();
                props.onClose();
              }}
            />
            <Flex
              flex="4px"
              justifyContent="space-between"
              alignItems="center"
              gap={4}
            >
              <Box>
                <TextOneLine
                  fontWeight="bold"
                  value={data.title}
                  maxW="400px"
                />
                <Text fontSize="sm">{moment(data.annoucedAt).fromNow()}</Text>
              </Box>
              <Image
                width="24px"
                height="24px"
                style={{ borderRadius: '50%' }}
                src={CYLIMIT_AVATAR}
              />
            </Flex>
          </Flex>
        ),
      }),
  });

  const total = _.get(unread, 'count', 0);

  const handleNavigation = async (item: Notification) => {
    const { redirectUrl } = item;

    if (!_.get(item, 'isRead')) {
      await mutateAsync(item._id);
    }

    const URL = getTemplatePath(PATH.VIEW_NOTIFICATION, { id: item._id });
    navigateTo(redirectUrl || URL);
  };

  return (
    <React.Fragment>
      <Popover>
        <PopoverTrigger>
          <Box cursor="pointer" pos="relative" h="24px">
            <Icon as={IoMdNotificationsOutline} fontSize="2xl" />
            {total > 0 && (
              <Box
                fontSize="8px"
                pos="absolute"
                bgColor="error.500"
                color="white"
                fontWeight="bold"
                borderRadius="sm"
                px="4px"
                top="-6px"
                left="12px"
              >
                {total > 99 ? '99+' : total}
              </Box>
            )}
          </Box>
        </PopoverTrigger>
        <PopoverContent _focus={{ outline: 'none' }}>
          <PopoverHeader fontWeight="semibold">
            <Flex justifyContent="space-between" pr={10}>
              <Flex alignItems="center" gap={2}>
                <Icon as={IoMdNotificationsOutline} />
                <Text translateText="notifications" />
              </Flex>
              <MarkReadAll />
            </Flex>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody p={0}>
            <Stack spacing={2} maxH="400px" overflow="scroll">
              {_.isEmpty(data?.pages) && (
                <Flex p={4}>
                  <NoResultFound type="common" />
                </Flex>
              )}
              {_.map(data?.pages, (page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {_.map(page, (item, index) => {
                    const isRead = _.get(item, 'isRead');
                    return (
                      <Flex
                        key={index}
                        gap={4}
                        px={4}
                        py={2}
                        _hover={{ bgColor: 'primary.500' }}
                        cursor="pointer"
                        alignItems="center"
                        onClick={() => handleNavigation(item)}
                      >
                        <Box
                          w="8px"
                          h="8px"
                          bg={isRead ? 'gray.300' : 'error.400'}
                          borderRadius="50%"
                          flexShrink={0}
                        />
                        <Flex
                          flex={1}
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box>
                            <TextOneLine
                              fontWeight="bold"
                              value={_.get(item, 'title', '')}
                              w="220px"
                            />
                            <Text fontSize="sm" color="gray.400">
                              {moment(_.get(item, 'annoucedAt', '')).fromNow()}
                            </Text>
                          </Box>
                          <Image
                            width="24px"
                            height="24px"
                            style={{ borderRadius: '50%' }}
                            src={CYLIMIT_AVATAR}
                          />
                        </Flex>
                      </Flex>
                    );
                  })}
                </React.Fragment>
              ))}
              {hasNextPage && (
                <Flex justifyContent="center">
                  {!isFetchingNextPage ? (
                    <Text
                      cursor="pointer"
                      _hover={{ color: 'primary.500' }}
                      translateText="load_more"
                      onClick={() => fetchNextPage()}
                    />
                  ) : (
                    <Loader size="md" />
                  )}
                </Flex>
              )}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </React.Fragment>
  );
};

export default AnnoucementButton;
