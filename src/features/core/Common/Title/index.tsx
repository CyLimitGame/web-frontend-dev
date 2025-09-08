import {
  Flex,
  Tooltip,
  Icon,
  FlexProps,
  TextProps,
  Box,
} from '@chakra-ui/react';
import { MdOutlineInfo } from 'react-icons/md';

import { Text } from '@/components/Common';

type TitleProps = FlexProps & {
  title: string;
  tooltip?: React.ReactNode;
  textProps?: TextProps;
};

const Title = ({ title, tooltip, textProps = {}, ...rest }: TitleProps) => {
  return (
    <Flex gap={1} {...rest}>
      <Text
        translateText={title}
        fontSize={['sm', 'md']}
        fontWeight="bold"
        color="white"
        textTransform="uppercase"
        {...textProps}
      />
      {tooltip && (
        <Tooltip label={tooltip} hasArrow>
          <Box cursor="pointer" w="24px" h="24px">
            <Icon as={MdOutlineInfo} w="24px" h="24px" />
          </Box>
        </Tooltip>
      )}
    </Flex>
  );
};

export default Title;
