import {
  Progress,
  ProgressProps,
  BoxProps,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { isNaN } from 'lodash';
import { useTranslation } from 'next-i18next';

type Props = BoxProps & {
  value: number;
  level?: number;
  total?: number;
  progressProps?: ProgressProps;
};

const LevelProgressBar = ({
  value,
  total = 0,
  level = 0,
  progressProps = {},
  ...rest
}: Props) => {
  const { t } = useTranslation();
  const percent = (value / total) * 100;
  return (
    <Box
      minW="300px"
      maxW={['540px', '540px', '540px', 'full']}
      w="full"
      {...rest}
    >
      <Flex
        justifyContent="space-between"
        textTransform="uppercase"
        mb="8px"
        color="white"
        fontWeight="bold"
        fontSize={['sm', 'md']}
      >
        <Text>
          {t('level')} {level}
        </Text>
        <Text>{`${value}/${total}`} XP</Text>
      </Flex>
      <Progress
        value={isNaN(percent) ? 0 : percent}
        h="10px"
        borderRadius="50px"
        sx={{
          '& > div': {
            backgroundColor: 'secondary.350',
          },
        }}
        {...progressProps}
      />
    </Box>
  );
};

export default LevelProgressBar;
