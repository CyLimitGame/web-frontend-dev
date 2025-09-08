import { ReactElement, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import { PATH } from '@/constants/path';
import { checkExpiredToken } from '@/apis';

type Props = {
  children: ReactElement;
};

const PUBLIC_PATH = [
  PATH.SIGNIN,
  PATH.SIGNUP,
  PATH.FORGOT_PASSWORD,
  PATH.RESET_PASSWORD,
  PATH.EMAIL_VERIFIED,
  PATH.TERMS_OF_SERVICE,
];

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  // const [authorized, setAuthorized] = useState(false);

  const authCheck = useCallback(
    (url: string) => {
      // redirect to login page if accessing a private page and not logged in
      const path = url.split('?')[0];
      if (PUBLIC_PATH.includes(path)) {
        return;
      }

      checkExpiredToken()
        .then(() => {
          // setAuthorized(true);
        })
        .catch(() => {
          // setAuthorized(false);
          router.push({
            pathname: PATH.SIGNIN,
          });
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [router]
  );

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!authorized) {
  //   return (
  //     <Flex height="100vh" alignItems="center" justifyContent="center">
  //       <Spinner
  //         thickness="4px"
  //         speed="0.65s"
  //         emptyColor="gray.200"
  //         color="primary.500"
  //         size="xl"
  //       />
  //     </Flex>
  //   );
  // }

  return children;
};

export default AuthProvider;
