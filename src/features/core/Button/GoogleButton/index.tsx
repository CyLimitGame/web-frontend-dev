import React from 'react';
import { Box } from '@chakra-ui/react';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { NEXT_PUBLIC_GOOGLE_AUTH_ID } from '@/config/appConfig';
import { GoogleIcon } from '@/icons';
import { useSignInWithGoogle } from '@/queries/useAuth';
import { getInviteCodeCookie } from '@/utils/cookies';

const Button = () => {
  const { mutate } = useSignInWithGoogle();

  const login = useGoogleLogin({
    onSuccess: ({ access_token }) =>
      mutate({ token: access_token, refInvitationCode: getInviteCodeCookie() }),
  });

  const handleLogin = () => {
    login && login();
  };

  return (
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
      onClick={handleLogin}
    >
      <GoogleIcon width={6} height={6} />
    </Box>
  );
};
const GoogleButton = () => {
  return (
    <GoogleOAuthProvider clientId={NEXT_PUBLIC_GOOGLE_AUTH_ID}>
      <Button />
    </GoogleOAuthProvider>
  );
};

export default GoogleButton;
