import React from 'react';
import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import { CardItem as CardItemProps } from '@/typings/card';
import { BaseButton } from '@/components/Button';
import {
  ShowAnimation,
  TextOneLine,
  CardImageLoader,
  AvgCapScoreAndBonus,
} from '@/components/Common';
import { NO_CARD } from '@/constants/images';

type Props = {
  item: CardItemProps;
  selected: boolean;
  onSelectCard?: (id: string) => void;
  disabled?: boolean;
  isShowButton?: boolean;
  isShowRemove?: boolean;
  onRemove?: (id: string) => void;
};

const CreateTeamCard = ({ item, selected, onSelectCard, disabled }: Props) => {
  const { t } = useTranslation();

  const handleSelectCard = () => {
    onSelectCard && onSelectCard(item.id);
  };

  const actualTeamName = _.get(item, 'rider.actualTeam.name', '');

  return (
    <ShowAnimation>
      <Box p={3} bg="white" borderRadius="xl" boxShadow="md">
        <CardImageLoader src={item?.imageUrl || NO_CARD} unoptimized />
        <TextOneLine
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
          color="gray.900"
          maxW="200px"
          margin="auto"
          mt={2}
          value={item?.name}
        />
        <TextOneLine
          textAlign="center"
          fontSize="xs"
          color="gray.500"
          maxW="200px"
          margin="auto"
          mt={1}
          value={actualTeamName}
          tooltipValue={actualTeamName}
        />
        <Box my={2}>
          <AvgCapScoreAndBonus item={item} />
        </Box>
        <Box>
          {selected ? (
            <BaseButton
              width="100%"
              mt={2}
              variant="outline-primary"
              size={['sm', 'md', 'lg']}
            >
              {t('chosen')}
            </BaseButton>
          ) : (
            <BaseButton
              onClick={handleSelectCard}
              variant="light"
              width="100%"
              mt={2}
              isDisabled={disabled}
              size={['sm', 'md', 'lg']}
            >
              {t('choose_this_card')}
            </BaseButton>
          )}
        </Box>
      </Box>
    </ShowAnimation>
  );
};

export default CreateTeamCard;
