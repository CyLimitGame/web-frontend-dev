import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { CookieName } from '@/constants/cookieName';

const useSetInviteCode = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query['inviteCode']) {
      return;
    }

    const inviteCode = router.query['inviteCode'];

    Cookies.set(CookieName.INVITE_CODE, inviteCode as string);

    router.replace(router.pathname, undefined, { shallow: true });
  }, [router.query, router.pathname]);
};

export default useSetInviteCode;
