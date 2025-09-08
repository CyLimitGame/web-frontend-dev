import React from 'react';
import {
  Box,
  Flex,
  ModalProps,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import { Text } from '@/components/Common';
import { BaseButton } from '@/components/Button';
import { BaseModal } from '@/components/Modal';

type Props = Omit<ModalProps, 'children'> & {
  onSubmit: () => void;
  item: any;
  price: number;
};

const ConfirmModal = ({ onSubmit, item, price, ...props }: Props) => {
  const { t } = useTranslation();

  const [name, rarity, serialNumber, yearOfEdition] = [
    _.get(item, 'name'),
    _.get(item, 'rarity'),
    _.get(item, 'serialNumber'),
    _.get(item, 'yearOfEdition'),
  ];

  return (
    <BaseModal
      {...props}
      size="4xl"
      isUseDrawerForMobile
      title="confirm"
      closeable
    >
      <Text
        translateText="are_you_sure"
        fontSize="md"
        textAlign="center"
        fontWeight="bold"
      />
      <Text textAlign="center" my={2}>
        {t('on_sale_for_value', { value: `$${price}` })}
      </Text>
      <Stack textAlign="center" display={['block', 'block', 'none']}>
        <Text>{name}</Text>
        <Text>{t('scarcity_value', { value: rarity })}</Text>
        <Text>{t('serial_number_value', { value: serialNumber })}</Text>
        <Text>{t('year_value', { value: yearOfEdition })}</Text>
      </Stack>
      <Box display={['none', 'none', 'block']} textTransform="uppercase">
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>{t('rider')}</Th>
                <Th>{t('scarcity')}</Th>
                <Th>{t('serial_number')}</Th>
                <Th isNumeric>{t('year')}</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{name}</Td>
                <Td>{t(rarity)}</Td>
                <Td>{serialNumber}</Td>
                <Td isNumeric>{yearOfEdition}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Flex gap={2} mt={4} maxW="400px" mx="auto">
        <BaseButton flex={1} variant="light" onClick={onSubmit}>
          {t('yes')}
        </BaseButton>
        <BaseButton flex={1} onClick={props.onClose}>
          {t('no')}
        </BaseButton>
      </Flex>
    </BaseModal>
  );
};

export default ConfirmModal;
