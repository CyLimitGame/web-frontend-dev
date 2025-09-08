import { useQuery } from 'react-query';
import _ from 'lodash';

import { API_PATH, getRiders, getUsers } from '@/apis';

export const useSearchRiderAndUser = (name: string) => {
  return useQuery(
    [API_PATH.RIDERS_SEARCH, API_PATH.USERS_SEARCH, name],
    async () => {
      const riderData = await getRiders({ page: 1, limit: 10, name });
      const userData = await getUsers({ page: 1, limit: 10, name });
      return [
        ..._.map(riderData.items, (item) => ({ ...item, type: 'rider' })),
        ..._.map(userData.items, (item) => ({ ...item, type: 'user' })),
      ];
    },
    { enabled: _.size(name) > 3 }
  );
};
