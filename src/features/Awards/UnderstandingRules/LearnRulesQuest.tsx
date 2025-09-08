import React from 'react';
import { Button, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';

import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';

import { UnderstandingRule } from '@/typings/awards';
import { BaseModal } from '@/components/Modal';
import { usePostUnderstandingRule } from '@/queries/useAwards';
import { ShowAnimation } from '@/components/Common';
import { BaseButton } from '@/components/Button';

const LearnRulesQuest = ({ quest }: { quest?: UnderstandingRule }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { t } = useTranslation();
  const { locale } = useRouter();

  const image = locale === 'fr' && quest?.image2 ? quest.image2 : quest?.image1;
  const title = locale === 'fr' && quest?.title2 ? quest.title2 : quest?.title1;

  const { mutate: claimUnderstandingRule } = usePostUnderstandingRule();
  const handleSubmit = () => {
    !!(quest?.id && !quest?.isClaimed) && claimUnderstandingRule(quest.id);
    onClose();
  };

  return image ? (
    <>
      <Button onClick={() => onOpen()} textTransform="uppercase">
        {t('learn')}
      </Button>
      <BaseModal
        onClose={() => onClose()}
        isOpen={isOpen}
        title={title}
        size="xl"
      >
        <ShowAnimation>
          <Image src={image as string} w="100%" />
        </ShowAnimation>
        <Flex justifyContent="center" gap={2} pt={4}>
          {quest?.id && !quest?.isClaimed ? (
            <Button onClick={handleSubmit} textTransform="uppercase">
              {t('claim_bidon')}
            </Button>
          ) : (
            <BaseButton onClick={() => onClose()}>
              <Text>{t('ok')}</Text>
            </BaseButton>
          )}
        </Flex>
      </BaseModal>
    </>
  ) : null;
};

export default LearnRulesQuest;
