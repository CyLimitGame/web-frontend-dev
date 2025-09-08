import { useRouter } from 'next/router';
import { FieldValues } from 'react-hook-form';
import qs from 'qs';

const useParamsQuery = () => {
  const router = useRouter();

  const getParam = (name: string): any => {
    return router.query[name];
  };

  const getParams = (): FieldValues => {
    return router.query;
  };

  const getParamsWithLocation = (name?: string): any => {
    if (typeof window === 'undefined') {
      return;
    }
    const params = qs.parse(location.search.replace('?', ''));
    return name ? params[name] : params;
  };

  return {
    getParams,
    getParam,
    getParamsWithLocation,
    router,
  };
};

export default useParamsQuery;
