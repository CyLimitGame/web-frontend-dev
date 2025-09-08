import React, { useState } from 'react';
import { InputGroup, InputRightElement } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import { TextInput } from '@/components/Inputs';
import { BaseButton } from '@/components/Button';
import { useSubscribeEmail } from '@/queries/useUser';

export const SubscribeButton = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const { mutateAsync, isLoading } = useSubscribeEmail();

  const checkValidateEmail = (value: string) => {
    return String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isValid = checkValidateEmail(email);

  const handleSubmit = async () => {
    await mutateAsync(email);
    setEmail('');
  };

  return (
    <InputGroup size="lg" mt={10} w="100%" maxW="360px">
      <TextInput
        name="email"
        pr="8rem"
        placeholder={t('your_email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputRightElement width="8rem" right="4px">
        <BaseButton
          size="md"
          variant="purple-gradient"
          isLoading={isLoading}
          isDisabled={!isValid || isLoading}
          onClick={handleSubmit}
        >
          {t('subscribe')}
        </BaseButton>
      </InputRightElement>
    </InputGroup>
  );
};
