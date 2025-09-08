import {
  ComponentWithAs,
  Flex,
  FlexProps,
  Icon,
  IconProps,
  MergeWithAs,
} from '@chakra-ui/react';
import { SVGProps, ComponentProps } from 'react';

type Props = FlexProps & {
  iconProps?: MergeWithAs<
    SVGProps<SVGSVGElement>,
    ComponentProps<ComponentWithAs<'svg', IconProps>>,
    IconProps,
    ComponentWithAs<'svg', IconProps>
  >;
};

const CircleIcon = ({ iconProps = {}, ...rest }: Props) => (
  <Flex
    cursor="pointer"
    w={['30px', '30px', '40px', '40px']}
    h={['30px', '30px', '40px', '40px']}
    borderRadius="full"
    backgroundColor="white"
    alignItems="center"
    justifyContent="center"
    color="black"
    transition="all 0.2s linear"
    _hover={{
      boxShadow: 'md',
      backgroundColor: 'blue.50',
    }}
    {...rest}
  >
    <Icon
      w={['18px', '18px', '28px', '28px']}
      h={['18px', '18px', '28px', '28px']}
      {...iconProps}
    />
  </Flex>
);

export default CircleIcon;
