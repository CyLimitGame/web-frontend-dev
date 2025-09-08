import { Box } from '@chakra-ui/react';
import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { ReactFacebookLoginInfo } from 'react-facebook-login';

import { NEXT_PUBLIC_FACEBOOK_AUTH_ID } from '@/config/appConfig';
import { FacebookIcon } from '@/icons';
import { useSignInWithFacebook } from '@/queries/useAuth';
import { getInviteCodeCookie } from '@/utils/cookies';

const FacebookButton = () => {
  const { mutate } = useSignInWithFacebook();
  const responseFacebook = ({ accessToken }: ReactFacebookLoginInfo) => {
    mutate({ token: accessToken, refInvitationCode: getInviteCodeCookie() });
  };

  return (
    <FacebookLogin
      appId={NEXT_PUBLIC_FACEBOOK_AUTH_ID}
      callback={responseFacebook}
      disableMobileRedirect={true}
      isMobile={false}
      render={(renderProps) => (
        <Box
          display="inline-flex"
          borderRadius="50%"
          justifyContent="center"
          alignItems="center"
          width="16"
          height="16"
          cursor="pointer"
          shadow="lg"
          bg="white"
          onClick={renderProps.onClick}
        >
          <FacebookIcon cursor="pointer" width={6} height={6} />
        </Box>
      )}
    />
  );
};

export default FacebookButton;
