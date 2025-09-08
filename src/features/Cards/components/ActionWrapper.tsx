import { Box, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';

import Title from '@/features/core/Common/Title';

type Props = {
  title?: string;
  tooltip?: string;
  children?: ReactNode;
};

const ActionWrapper = ({ title, tooltip, children }: Props) => {
  const { t } = useTranslation();
  return (
    <Box w="full">
      {!!title && (
        <Title
          title={title}
          tooltip={t(tooltip || '')}
          mb={2}
          justifyContent={['center', 'center', 'center', 'flex-start']}
        />
      )}
      <Flex
        px={[2, 2, 5]}
        py={[3, 3, 5]}
        flexDirection={['column', 'column', 'column', 'row']}
        alignItems="center"
        justifyContent="space-between"
        border="2px solid"
        borderColor="white"
        borderRadius="20px"
        gap="24px"
        sx={{
          '& > *': {
            w: ['full', 'full', 'full', 'auto'],
          },
        }}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default ActionWrapper;
