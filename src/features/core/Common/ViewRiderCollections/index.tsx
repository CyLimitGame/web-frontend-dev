import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { MdRemoveRedEye } from 'react-icons/md';
import Link from 'next/link';

import { PATH } from '@/constants/path';
import { getTemplatePath } from '@/utils/string';

type Props = {
  riderId: string;
};

const ViewRiderCollections = ({ riderId }: Props) => {
  const URL = getTemplatePath(PATH.RIDER_SCORE, { riderId });

  return (
    <Link href={URL} passHref>
      <Box as="a" display="inline">
        <Icon
          as={MdRemoveRedEye}
          color="gray.400"
          cursor="pointer"
          _hover={{ color: 'primary.500' }}
        />
      </Box>
    </Link>
  );
};

export default ViewRiderCollections;
