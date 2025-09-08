import React from 'react';
import { Box, Flex, Icon, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { MdInfoOutline } from 'react-icons/md';

type Props = {
  isAcquired: boolean;
  onChange: (value: boolean) => void;
};

const SwitchModeScore = ({ isAcquired, onChange }: Props) => {
  const { t } = useTranslation();
  return (
    <Flex gap={2} alignItems="center">
      <Flex
        bg="input"
        borderRadius="xl"
        fontSize="sm"
        fontWeight="bold"
        overflow="hidden"
        cursor="pointer"
      >
        <Box
          p={2}
          px={4}
          bg={isAcquired ? 'transparent' : 'error.400'}
          borderRadius="xl"
          transition="all .2s"
          _hover={{ opacity: 0.5 }}
          onClick={() => onChange(false)}
        >
          {t('virtual_score')}
        </Box>
        <Box
          p={2}
          px={4}
          bg={!isAcquired ? 'transparent' : 'error.400'}
          borderRadius="xl"
          transition="all .2s"
          _hover={{ opacity: 0.5 }}
          onClick={() => onChange(true)}
        >
          {t('acquired_score')}
        </Box>
      </Flex>
      <Box>
        <Tooltip
          label={t('acquired_score_without_end_of_race_classifications')}
        >
          <span>
            <Icon as={MdInfoOutline} fontSize="2xl" />
          </span>
        </Tooltip>
      </Box>
    </Flex>
  );
};

export default SwitchModeScore;
