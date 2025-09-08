import React, { useEffect, useState } from 'react';
import { Box, Center, Flex, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import _ from 'lodash';
import { useTranslation } from 'next-i18next';

import { BaseModal } from '@/components/Modal';
import {
  DataGrid,
  MotionBox,
  AvgCapScoreAndBonus,
  TextOneLine,
} from '@/components/Common';
import { GRAY_CARD, NO_CARD, SKELETON } from '@/constants/images';
import { BaseButton } from '@/components/Button';
import { useTakeFreeCard } from '@/queries/useCard';
import { getRiderImage } from '@/utils/string';

type Props = {
  data: any;
  onSuccess: () => void;
};

const Card = ({ data, onSuccess }: Props) => {
  const { t } = useTranslation();
  const [rotateY, setRotateY] = useState(0);
  const [idSelected, setIdSelected] = useState('');
  const [riderId, setRiderId] = useState(_.get(data, 'riderId'));
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutateAsync, isLoading } = useTakeFreeCard();

  const rarity = _.get(data, 'rarity', '');
  const freeCardCapScoreId = _.get(data, 'freeCardCapScoreId', '');
  const pool = _.get(data, 'pool', []);

  const findRider = _.find(
    pool,
    (item) => _.get(item, 'riderId.id') === riderId
  );

  const handleToggle = () => {
    if (!findRider) {
      onOpen();
    }
  };

  const handleTakeFreeCard = async () => {
    await mutateAsync({ riderId: idSelected, freeCardCapScoreId });
    setRiderId(idSelected);
    onClose();
    onSuccess();
  };

  const imageUrl = _.get(
    findRider,
    rarity === 'white' ? 'riderId.freeCard.imageUrl' : 'riderId.imageUrl',
    rarity === 'white' ? GRAY_CARD : NO_CARD
  );

  useEffect(() => {
    if (!_.isEmpty(findRider)) {
      setRotateY(180);
    }
  }, [findRider]);

  return (
    <React.Fragment>
      <Box
        _hover={{ transform: 'scale(1.02)' }}
        transition="transform .1s"
        cursor="pointer"
        onClick={handleToggle}
      >
        <MotionBox
          sx={{ aspectRatio: '0.7' }}
          borderRadius="xl"
          position="relative"
          overflow="hidden"
          animate={{ rotateY }}
        >
          <Image
            src={findRider ? imageUrl : GRAY_CARD}
            layout="fill"
            placeholder="blur"
            blurDataURL={SKELETON}
            style={{ transform: `rotateY(${rotateY ? '-180deg' : '0deg'})` }}
          />
        </MotionBox>
        <Flex flexDirection="column" gap={1} mt={2}>
          {findRider && (
            <Box>
              <AvgCapScoreAndBonus item={_.get(findRider, 'riderId')} />
              <TextOneLine
                value={_.get(findRider, 'riderId.actualTeam.name')}
                fontSize="xs"
                fontWeight="bold"
                textAlign="center"
                mt={1}
              />
            </Box>
          )}
        </Flex>
      </Box>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title="choose_your_card"
        isUseDrawerForMobile
        size="2xl"
      >
        <DataGrid
          data={pool}
          columns={[3]}
          gap={[2]}
          renderItem={(record) => {
            return (
              <Box
                border="1px solid"
                borderColor={
                  idSelected === _.get(record, 'riderId.id')
                    ? 'white'
                    : 'transparent'
                }
                p={2}
                overflow="hidden"
                borderRadius="xl"
                position="relative"
                _hover={{ transform: 'scale(1.02)' }}
                transition="all .2s"
              >
                <Box
                  sx={{ aspectRatio: '0.7' }}
                  borderRadius="xl"
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  onClick={() => setIdSelected(_.get(record, 'riderId.id'))}
                >
                  <Image
                    src={getRiderImage(record, rarity)}
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={SKELETON}
                  />
                </Box>
                <Box mt={2}>
                  <AvgCapScoreAndBonus item={record.riderId} />
                </Box>
                <TextOneLine
                  value={_.get(record, 'riderId.actualTeam.name')}
                  fontSize="xs"
                  fontWeight="bold"
                  textAlign="center"
                  mt={1}
                />
              </Box>
            );
          }}
        />
        <Center mt={4}>
          <BaseButton
            variant="light"
            isDisabled={!idSelected}
            isLoading={isLoading}
            onClick={handleTakeFreeCard}
          >
            {t('confirm')}
          </BaseButton>
        </Center>
      </BaseModal>
    </React.Fragment>
  );
};

export default Card;
