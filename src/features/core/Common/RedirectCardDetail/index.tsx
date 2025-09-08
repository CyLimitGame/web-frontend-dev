import React from 'react';
import { Box } from '@chakra-ui/react';
import Link from 'next/link';

import { getTemplatePath } from '@/utils/string';
import { PATH } from '@/constants/path';

type Props = {
  children: React.ReactNode;
  id: string;
};

const RedirectCardDetail = ({ children, id }: Props) => {
  return (
    <Link href={getTemplatePath(PATH.CARD_DETAILS, { id })} passHref>
      <Box display="inline" _hover={{ opacity: 0.5 }} cursor="pointer" as="a">
        {children}
      </Box>
    </Link>
  );
};

export default RedirectCardDetail;
