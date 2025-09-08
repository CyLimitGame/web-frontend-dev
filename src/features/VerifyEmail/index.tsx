import React, { useEffect, useState } from 'react';
import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import ShowInfoAndContinue from './ShowInfoAndContinue';

import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { getUserProfile } from '@/apis';
import { setTokenCookie } from '@/utils/cookies';
import { Jersey, Sponsor } from '@/typings/user.enum';

const VerifyEmail = () => {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const getInfo = async () => {
      setTokenCookie(router.query.token as string);
      const data = await getUserProfile();
      setUser(data);
    };
    if (router.query.token) {
      getInfo();
    }
  }, [router.query.token]);

  return (
    <Center minH="100vh" flexDirection="column" fontStyle="italic">
      <ShowInfoAndContinue
        nickName={_.get(user, 'nickName', '')}
        jersey={_.get(user, 'jersey', '') as Jersey}
        sponsor={_.get(user, 'sponsor', '') as Sponsor}
        primaryColor={_.get(user, 'primaryColor', '')}
        secondaryColor={_.get(user, 'secondaryColor', '')}
        onNext={() => navigateTo(PATH.OPEN_THE_PACK)}
      />
    </Center>
  );
};

export default VerifyEmail;
