import { useTranslation } from 'next-i18next';

type Props = {
  text: string;
  variables?: any;
};

const Translate = ({ text, variables }: Props) => {
  const { t } = useTranslation();

  return <>{t(text, variables)}</>;
};

export default Translate;
