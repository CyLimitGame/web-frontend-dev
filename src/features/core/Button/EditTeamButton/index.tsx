import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { BaseButton } from '@/components/Button';
import { PATH } from '@/constants/path';

type Props = {
  gameId: string;
  divisionId: string;
};

const EditTeamButton = ({ divisionId, gameId }: Props) => {
  const { t } = useTranslation();
  const url = `${PATH.PATICIPATE}/${gameId}?league=${divisionId}&mode=edit`;
  return (
    <Link href={url} passHref>
      <BaseButton variant="light" size={['sm', 'md', 'lg']} as="a">
        {t('edit')}
      </BaseButton>
    </Link>
  );
};

export default EditTeamButton;
