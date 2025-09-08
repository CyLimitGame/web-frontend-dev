import React, { useContext } from 'react';
import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { useTranslation } from 'next-i18next';

import { FilterContext } from '.';

const Search = () => {
  const { t } = useTranslation();
  const { form } = useContext(FilterContext);
  const { register } = form;
  return (
    <InputGroup>
      <Input
        borderRadius="md"
        border="1px solid"
        borderColor="border"
        backgroundColor="transparent"
        size="md"
        placeholder={t('search_by_name')}
        {...register('searchValue')}
      />
      <InputRightElement>
        <Icon as={BsSearch} />
      </InputRightElement>
    </InputGroup>
  );
};

export default Search;
