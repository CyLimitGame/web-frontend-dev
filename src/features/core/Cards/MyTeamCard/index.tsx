import React from 'react';
import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { HiPlus } from 'react-icons/hi';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import { CardItem as CardItemProps } from '@/typings/card';
import {
  ShowAnimation,
  TextOneLine,
  CardImageLoader,
  Text,
  Ribon,
  AvgCapScoreAndBonus,
} from '@/components/Common';
import { BaseButton } from '@/components/Button';
import colors from '@/theme/foundations/colors';
import { NO_CARD } from '@/constants/images';
import { MAP_ROLES } from '@/constants/common';

type Props = {
  item: CardItemProps;
  onRemove?: (id: string) => void;
  selected?: boolean;
  onClick?: () => void;
  captainId?: string;
  isOnedayrace: boolean;
};

const WrapItem = ({ children, ...props }: FlexProps) => {
  return (
    <ShowAnimation w="100%" h="100%">
      <Flex
        justifyContent="center"
        alignItems="center"
        bg="primary.500"
        borderRadius="2xl"
        position="relative"
        flexShrink="0"
        w="100%"
        bgGradient={['linear(to-b, primary.600, primary.700)']}
        {...props}
      >
        <Icon as={HiPlus} fontSize="4xl" color="primary.300" pos="absolute" />
        {children}
      </Flex>
    </ShowAnimation>
  );
};

const CardData = ({ item, onRemove, captainId, isOnedayrace }: Props) => {
  const { t } = useTranslation();
  const handleRemoveCard = () => {
    onRemove && onRemove(item.id);
  };

  return (
    <ShowAnimation w="100%" h="100%">
      <Box
        p={[2, 2, 3]}
        bg="primary.50"
        borderRadius="xl"
        pos="relative"
        overflow="hidden"
      >
        {item.id === captainId && <Ribon label="road_captain" />}
        <Flex flexDirection="column" h="100%" justifyContent="space-between">
          {_.get(item, 'status') ? (
            <CardImageLoader src={item?.imageUrl || NO_CARD} unoptimized />
          ) : (
            <Box sx={{ aspectRatio: '0.65' }} />
          )}
          <Flex
            flexDirection="column"
            height={['120px', '120px', '160px']}
            justifyContent="end"
          >
            <Flex flexDirection="column" justifyContent="end">
              <TextOneLine
                textAlign="center"
                fontSize="lg"
                fontWeight="bold"
                color="gray.900"
                maxW="100%"
                margin="auto"
                mt={2}
                value={t(item?.name).replace(isOnedayrace ? '(GC)' : '', '')}
              />
            </Flex>
            {item.bonus && (
              <Box my={2}>
                <AvgCapScoreAndBonus item={item} />
              </Box>
            )}
            {_.get(item, 'status') && (
              <Flex mt={2} flexDirection="column">
                {onRemove && (
                  <BaseButton
                    onClick={handleRemoveCard}
                    w="100%"
                    variant="light"
                    size={['sm', 'md', 'lg']}
                  >
                    {t('remove_this_card')}
                  </BaseButton>
                )}
                <Text mt={2} textAlign="center" fontWeight="bold" fontSize="sm">
                  {t(
                    MAP_ROLES[_.get(item, 'role', '') as keyof typeof MAP_ROLES]
                  ).replace(isOnedayrace ? '(GC)' : '', '')}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
    </ShowAnimation>
  );
};

const MyTeamCard = ({
  item,
  onRemove,
  selected,
  onClick,
  captainId,
  isOnedayrace,
}: Props) => {
  return (
    <WrapItem
      outline={!item?.id ? '1px dashed' : 'none'}
      outlineColor={!item?.id ? 'gray.200' : 'transparent'}
      border={selected ? `2px solid ${colors.success[500]}` : 'none'}
      cursor="pointer"
      onClick={onClick}
    >
      <CardData
        item={item}
        onRemove={onRemove}
        captainId={captainId}
        isOnedayrace={isOnedayrace}
      />
    </WrapItem>
  );
};

export default MyTeamCard;
