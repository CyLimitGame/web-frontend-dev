import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import { Loader } from '@/components/Common';
import useParamsQuery from '@/hooks/useGetParams';
import { useLinkAccount } from '@/queries/useUser';

const LinkDiscord = () => {
  const { getParam } = useParamsQuery();
  const code = getParam('code');

  const { mutate } = useLinkAccount();

  useEffect(() => {
    if (code) {
      mutate({ code, type: 'discord', unlink: false });
    }
  }, [code]);

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Loader />
    </Flex>
  );
};

export default LinkDiscord;
