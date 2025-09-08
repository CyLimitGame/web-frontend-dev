import { Box, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';
import _ from 'lodash';

import { Loader, Text } from '@/components/Common';
import { useGetCountGameTeams } from '@/queries/useGame';
import { GroupUserIcon } from '@/icons';

type Props = {
  id: string;
};

const TotalTeam = ({ id }: Props) => {
  const { mutateAsync, isLoading } = useGetCountGameTeams();
  const [countLeagues, setCountLeagues] = useState<
    { count: number; name: string }[]
  >([]);

  const handleHover = async () => {
    const res = await mutateAsync(id);
    const result = _.map(res, (item) => ({
      count: item.count,
      name: ['1', '2', '3', '4'].includes(item.division.name)
        ? `League ${item.division.name}`
        : item.division.name,
    }));
    setCountLeagues(result);
  };

  const renderCountTeams = () => {
    if (isLoading) {
      return <Loader size="md" />;
    }

    return (
      <Box>
        {_.map(
          _.sortBy(countLeagues, (o) =>
            [
              'League 1',
              'League 2',
              'League 3',
              'League 4',
              '1',
              '2',
              '3',
              '4',
            ].indexOf(o.name as string)
          ),
          (item, index) => (
            <Box key={index}>
              <Text>
                {`${_.get(item, 'name')}:
              ${_.get(item, 'count')}`}
              </Text>
            </Box>
          )
        )}
      </Box>
    );
  };

  return (
    <Tooltip label={renderCountTeams()}>
      <GroupUserIcon ml={2} onMouseEnter={handleHover} cursor="pointer" />
    </Tooltip>
  );
};

export default TotalTeam;
