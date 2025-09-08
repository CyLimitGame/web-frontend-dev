import React, { useCallback, useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { IoMdBicycle } from 'react-icons/io';
import { BiUser } from 'react-icons/bi';
import { FiCornerDownLeft } from 'react-icons/fi';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import { BaseModal } from '@/components/Modal';
import { useSearchRiderAndUser } from '@/queries/useSearch';
import { Loader, Text } from '@/components/Common';
import { getFullName } from '@/utils/user';
import { PATH } from '@/constants/path';
import { getTemplatePath } from '@/utils/string';
import { navigateTo } from '@/utils/navigation';

const Search = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [searchValue, setSearchValue] = useState('');

  const { t } = useTranslation();

  const { register } = useForm();

  const { data, isLoading } = useSearchRiderAndUser(searchValue);

  const onSubmitData = useCallback(
    _.debounce((value) => {
      setSearchValue(value);
    }, 500),
    []
  );

  const handleSearch = (value: string) => {
    onSubmitData(value);
  };

  const handleRedirect = (type: string, id: string) => {
    if (type === 'user') {
      const URL = getTemplatePath(PATH.USER_DETAIL, { userId: id });
      navigateTo(URL);
    }
    if (type === 'rider') {
      const URL = getTemplatePath(PATH.RIDER_SCORE, { riderId: id });
      navigateTo(URL);
    }
  };

  return (
    <>
      <Icon as={BsSearch} cursor="pointer" onClick={onOpen} />
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        isShowHeader={false}
        size="md"
        isUseDrawerForMobile
        placement="top"
        drawerContentProps={{ sx: { borderBottomRadius: 10 } }}
      >
        <InputGroup>
          <Input
            placeholder={t('search_riders_and_managers')}
            size="lg"
            {...register('searchValue')}
            onChange={({ target: { value } }) => handleSearch(value)}
          />
          <InputRightElement>
            <Icon as={BsSearch} />
          </InputRightElement>
        </InputGroup>
        <Box maxH="370px" overflow="auto">
          {isLoading ? (
            <Flex justifyContent="center" mt={2}>
              <Loader />
            </Flex>
          ) : (
            <Stack spacing={4} mt={2}>
              {_.map(data, (item) => {
                const name = _.get(item, 'name');
                const type = _.get(item, 'type');
                return (
                  <Flex
                    bg="input"
                    px={4}
                    py={3}
                    borderRadius="md"
                    justifyContent="space-between"
                    alignItems="center"
                    cursor="pointer"
                    _hover={{ filter: 'brightness(0.8)' }}
                    onClick={() => handleRedirect(item.type, item.id as string)}
                    key={item.id}
                  >
                    <Box>
                      <Text fontWeight="bold">
                        {type === 'user' ? getFullName(item as any) : name}
                      </Text>
                      <Flex gap={1}>
                        <Flex
                          display="inline-flex"
                          alignItems="center"
                          gap={2}
                          bg="primary.100"
                          py={1}
                          px={4}
                          borderRadius={20}
                          mt={1}
                        >
                          <Icon
                            as={type === 'user' ? BiUser : IoMdBicycle}
                            color="gray.500"
                          />
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="gray.500"
                            translateText={
                              type === 'user' ? 'manager' : 'rider'
                            }
                          />
                        </Flex>
                      </Flex>
                    </Box>
                    <Icon as={FiCornerDownLeft} />
                  </Flex>
                );
              })}
            </Stack>
          )}
        </Box>
      </BaseModal>
    </>
  );
};

export default Search;
