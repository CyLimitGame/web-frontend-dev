import React from 'react';
import { useTranslation } from 'next-i18next';

import { BaseButton } from '@/components/Button';
import { navigateTo } from '@/utils/navigation';
import { PATH } from '@/constants/path';
import { getTemplatePath } from '@/utils/string';

type Props = {
  gameId: string;
};

const TeamCompositionRuleButton = ({ gameId }: Props) => {
  const { t } = useTranslation();

  const handleToggle = () => {
    const URL = getTemplatePath(PATH.GAME_DETAIL, { gameId });
    navigateTo(`${URL}?tab=1`);
  };

  return (
    <>
      <BaseButton
        variant="purple-gradient"
        size={['md', 'md', 'lg']}
        onClick={handleToggle}
      >
        {t('team_composition_rules')}
      </BaseButton>
    </>
  );
};

export default TeamCompositionRuleButton;
