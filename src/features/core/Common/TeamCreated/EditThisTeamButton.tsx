// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Flex, Box, useMediaQuery } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import _ from 'lodash';

import { MyTeamCard } from '@/features/core/Cards';
import ListCardsForCreateTeam from '@/features/core/ListCardsForCreateTeam';
import { Container, DataGrid, Text } from '@/components/Common';
import { CardItem as CardItemProps } from '@/typings/card';
import { BaseButton } from '@/components/Button';
import {
  checkRuleDisivion,
  getCardsMyTeam,
  useGetGameController,
  useUpdateTeam,
} from '@/queries/useGame';
import useParamsQuery from '@/hooks/useGetParams';
import SelectInput from '@/components/Inputs/SelectInput';
import { useToastMessage } from '@/hooks/useToastMessage';
import { BaseModal } from '@/components/Modal';
import Team from '@/features/Participate/Team';
import breakpoints from '@/theme/foundations/breakpoints';
import { formatPrice } from '@/utils/number';

type Props = {
  divisionId: string;
  nfts: CardItemProps[];
  teamId: string;
  captainId: string;
  divisionName: string;
};

const EditThisTeamButton = ({
  divisionId,
  nfts,
  teamId,
  captainId: defaultCaptainId,
  divisionName,
}: Props) => {
  const toast = useToastMessage();
  const { t } = useTranslation();
  const { getParam } = useParamsQuery();
  const gameId = getParam('id');

  const [isLessThanMedium] = useMediaQuery(`(max-width: ${breakpoints['md']})`);
  const [isLessThanLarge] = useMediaQuery(`(max-width: ${breakpoints['lg']})`);

  const [listItemSelected, setListItemSelected] =
    useState<CardItemProps[]>(nfts);
  const [indexSelected, setIndexSelected] = useState(0);
  const [captainId, setCaptainId] = useState(defaultCaptainId);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);

  const { data: gameController } = useGetGameController(gameId);
  const isOnedayrace = !!_.get(gameController, 'race.is_onedayrace');
  const gameMode = _.get(gameController, 'gameMode');

  const rules = _.get(gameController, 'rule.roles', []);
  const divisions = _.get(gameController, 'rule.leagues', []);

  const LIMIT = rules.length;
  const cardSelectedIds = _.map(listItemSelected, (item) => item.id);
  const disabledChoose = _.get(
    getCardsMyTeam(rules, listItemSelected),
    `[${indexSelected}]._id`
  );
  const riderIds: string[] = _.map(
    listItemSelected,
    (item) => item.rider?.id as string
  );

  const { mutateAsync, isLoading } = useUpdateTeam();

  const handleRemoveCard = (id: string) => {
    setListItemSelected((current) => {
      const cards = current.filter((card) => card.id !== id);
      if (id === captainId) {
        setCaptainId('');
      }
      return cards;
    });
  };

  const handleSelectCard = (item: CardItemProps) => {
    setListItemSelected([
      ...listItemSelected,
      {
        ...item,
        role: rules[indexSelected].role,
        index: indexSelected,
        _id: item.id,
      },
    ]);
    // toast({
    //   status: 'success',
    //   description: (
    //     <Box>
    //       <Text>NA: -5%.</Text>
    //       <Text>White: 0%</Text>
    //       <Text>Blue: 20%</Text>
    //       <Text>Pink: 40%</Text>
    //       <Text>Yellow: 60%</Text>
    //     </Box>
    //   ),
    // });
  };

  const handleCloseModal = () => {
    setIsOpenModalConfirm(false);
  };

  // FOR CAP
  const totalAverageCapScore =
    _.sumBy(listItemSelected, 'capScore.averageCapScore') || 0;

  const creditLeagues = _.get(gameController, 'creditLeagues');
  const creditLeague = _.find(
    creditLeagues,
    (item) => _.get(item, 'divisionId') === divisionId
  );
  const totalCredit = _.get(creditLeague, 'credit', 0);

  const handleCreate = async () => {
    const isValid = checkRuleDisivion(
      _.find(divisions, (item) => item.id === divisionId)?.options,
      listItemSelected
    );

    const isCheckCapMode =
      gameMode === 'cap' && totalAverageCapScore < totalCredit;

    if (!isValid || isCheckCapMode) {
      // Ref https://cylimit.atlassian.net/browse/CYL-928
      return toast({
        description: t('wrong_team_composition_league4'),
        status: 'info',
      });
    }

    await mutateAsync({
      id: gameId,
      nfts: listItemSelected,
      captainId,
      divisionId,
      teamId,
    });
    handleCloseModal();
  };

  const renderButton = () => {
    return (
      <Flex
        alignItems="center"
        gap={2}
        mt={4}
        flexDirection={['row', 'row', 'row', 'column']}
      >
        <SelectInput
          label={t(!isLessThanMedium ? 'choose_a_captain' : 'road_captain')}
          lableProps={{ fontSize: ['xs', 'sm', 'sm', 'md'] }}
          name="isCaptain"
          choices={_.map(listItemSelected, (item) => ({
            id: item.id,
            label: item.name,
            value: item.id,
          }))}
          bg="primary.50 !important"
          color="black"
          formControlProps={{ width: '264px' }}
          style={{ color: 'black' }}
          showEmptyOption
          value={captainId}
          onChange={(e) => setCaptainId(e.target.value)}
        />
        <BaseButton
          mt={[7, 7, 7, 2]}
          colorScheme="primary"
          width="264px"
          size="md"
          onClick={handleCreate}
          isLoading={isLoading}
          isDisabled={cardSelectedIds.length < LIMIT || !captainId || isLoading}
        >
          {t('update')}
        </BaseButton>
      </Flex>
    );
  };

  useEffect(() => {
    setListItemSelected(_.filter(nfts, (item) => !!item.rarity));
  }, [nfts]);

  const myTeamCards = getCardsMyTeam(rules, listItemSelected);

  return (
    <Flex justifyContent="center" mt={5}>
      <BaseButton
        variant="light"
        onClick={() => setIsOpenModalConfirm(!isOpenModalConfirm)}
      >
        {t('edit_this_team')}
      </BaseButton>
      <BaseModal
        isOpen={isOpenModalConfirm}
        onClose={handleCloseModal}
        size="full"
        title="edit_team"
        closeable
      >
        <Container maxWidth="1440px">
          <Flex mx={[-5, -5, -5, 0]}>
            <Box
              flex={1}
              minHeight={0}
              minWidth={0}
              pb={['200px', '200px', '200px', '20px']}
            >
              <Box>
                <Text
                  fontSize={['xl', 'xl', '2xl', '4xl']}
                  color="gray.900"
                  fontWeight="bold"
                  mt={[4, 4, 8]}
                >
                  {`${divisionName}`}
                </Text>
                <Text
                  translateText="choose_from_my_cards"
                  fontSize="2xl"
                  color="gray.900"
                  fontWeight="bold"
                  mt={[4, 4, 8]}
                />
              </Box>
              <ListCardsForCreateTeam
                cardSelectedIds={cardSelectedIds}
                disabledChoose={!!disabledChoose}
                includedTeamId={teamId}
                riderIds={riderIds}
                onSelectCard={handleSelectCard}
                columns={_.size(myTeamCards)}
              />
              {!isLessThanLarge ? (
                <>
                  {/* <Text
                    translateText="my_team"
                    fontWeight="bold"
                    fontSize="2xl"
                    color="gray.900"
                    mt={5}
                    mb={4}
                  /> */}
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mt={5}
                    mb={4}
                  >
                    <Text
                      translateText="my_team"
                      fontWeight="bold"
                      fontSize="2xl"
                      color="gray.900"
                    />
                    <Text
                      color={
                        totalAverageCapScore >= totalCredit
                          ? 'success.500'
                          : 'error.500'
                      }
                      fontWeight="bold"
                      fontSize="sm"
                    >
                      {t('credits_value', {
                        value: `${formatPrice(
                          totalAverageCapScore
                        )}/${totalCredit}`,
                      })}
                    </Text>
                  </Flex>
                  <DataGrid
                    data={getCardsMyTeam(rules, listItemSelected)}
                    columns={[2, 2, 3, _.size(myTeamCards)]}
                    gap={1}
                    renderItem={(item, index) => (
                      <MyTeamCard
                        key={item.id || index}
                        item={item}
                        selected={index === indexSelected}
                        onClick={() => setIndexSelected(index)}
                        onRemove={() => handleRemoveCard(item.id)}
                        captainId={captainId}
                        isOnedayrace={isOnedayrace}
                      />
                    )}
                  />
                  {renderButton()}
                </>
              ) : (
                <Team
                  data={
                    getCardsMyTeam(rules, listItemSelected) as CardItemProps[]
                  }
                  onRemove={handleRemoveCard}
                  indexSelected={indexSelected}
                  onClick={setIndexSelected}
                  footer={() => renderButton()}
                />
              )}
            </Box>
          </Flex>
        </Container>
      </BaseModal>
    </Flex>
  );
};

export default EditThisTeamButton;
