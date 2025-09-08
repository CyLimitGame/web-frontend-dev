import React, { createContext, useEffect, useMemo, useState } from 'react';
import {
  Box,
  BoxProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Icon,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { MdFilterList } from 'react-icons/md';
import { useTranslation } from 'next-i18next';
import { Control, UseFormReturn, useForm } from 'react-hook-form';
import _ from 'lodash';
import { useRouter } from 'next/router';

import Rarity from './Rarity';
import CurrentTeam from './CurrentTeam';
import Division from './Division';
import AverageScore from './AverageScore';
import Price from './Price';
import InStartlistOf from './InStartlistOf';
import Age from './Age';
import Nationality from './Nationality';
import Season from './Season';
import SerialNumber from './SerialNumber';
import Team from './Team';
import ForSale from './ForSale';
import { sanitizeFilter, getDefaultFilter } from './actions';
import Search from './Search';

import { BaseButton } from '@/components/Button';
import { changeQueryRouter } from '@/utils/common';
import { FilterCardOption } from '@/typings/card';

type FilterContextType = FilterCardOption & {
  control: Control;
  form: UseFormReturn;
};

export const FilterContext = createContext<FilterContextType>({
  currentTeams: [],
  teamCards: [],
  nationalities: [],
  yearOfEditions: [],
  typeOfCard: [],
  startListOfRiders: [],
  control: {} as Control,
  form: {} as UseFormReturn,
  statuses: [],
  rarities: [],
});

type KeyAccess =
  | 'Search'
  | 'ForSale'
  | 'Rarity'
  | 'CurrentTeam'
  | 'Division'
  | 'AverageScore'
  | 'Price'
  | 'Age'
  | 'Nationality'
  | 'InStartlistOf'
  | 'Age'
  | 'Nationality'
  | 'Season'
  | 'SerialNumber'
  | 'Team';

type CommonPropsType = FilterContextType & {
  defaultComponent: React.JSX.Element;
};

type FilterComponentType = {
  [k in KeyAccess]?: (props: CommonPropsType) => React.JSX.Element;
};

type ReplaceComponentOptions = {
  key: KeyAccess;
  components: FilterComponentType;
  defaultComponent: React.JSX.Element;
  props: FilterContextType;
};

export const renderFilterComponent = ({
  key,
  components,
  defaultComponent,
  props,
}: ReplaceComponentOptions) => {
  const renderComponent = components[key];
  if (renderComponent) {
    return renderComponent({ defaultComponent, ...props });
  }
  return defaultComponent;
};

const FilterComponents: {
  key: KeyAccess;
  Component: (props: any) => React.ReactNode;
}[] = [
  {
    key: 'Search',
    Component: Search,
  },
  {
    key: 'ForSale',
    Component: ForSale,
  },
  {
    key: 'Rarity',
    Component: Rarity,
  },
  {
    key: 'CurrentTeam',
    Component: CurrentTeam,
  },
  {
    key: 'Division',
    Component: Division,
  },
  {
    key: 'AverageScore',
    Component: AverageScore,
  },
  {
    key: 'Price',
    Component: Price,
  },
  {
    key: 'InStartlistOf',
    Component: InStartlistOf,
  },
  {
    key: 'Age',
    Component: Age,
  },
  {
    key: 'Nationality',
    Component: Nationality,
  },
  {
    key: 'Season',
    Component: Season,
  },
  {
    key: 'SerialNumber',
    Component: SerialNumber,
  },
  {
    key: 'Team',
    Component: Team,
  },
];

type Props = BoxProps & {
  components?: FilterComponentType;
  paramsCardFilter?: FilterCardOption;
  children?: React.JSX.Element;
  header?: React.JSX.Element;
  resetDataCondition?: string;
  defaultFilter?: any;
};

const Filter = ({
  components = {},
  paramsCardFilter,
  children,
  header,
  resetDataCondition,
  defaultFilter,
  ...rest
}: Props) => {
  const { t } = useTranslation();
  const [isFirstSetValue, setIsFirstSetValue] = useState(true);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const form = useForm({
    defaultValues: { ...getDefaultFilter(), ...defaultFilter },
  }) as unknown as UseFormReturn;

  const { watch, control, reset } = form;
  const router = useRouter();

  const cardFilter = useMemo(() => {
    const currentTeams = _.get(paramsCardFilter, 'currentTeams', []);
    const teamCards = _.get(paramsCardFilter, 'teamCards', []);
    const nationalities = _.get(paramsCardFilter, 'nationalities', []);
    const yearOfEditions = _.get(paramsCardFilter, 'yearOfEditions', []);
    const typeOfCard = _.get(paramsCardFilter, 'typeOfCard', []);
    const startListOfRiders = _.get(paramsCardFilter, 'startListOfRiders', []);
    const statuses = _.get(paramsCardFilter, 'statuses', []);
    const rarities = _.get(paramsCardFilter, 'rarities', []);
    const commonProps = {
      currentTeams,
      teamCards,
      nationalities,
      yearOfEditions,
      typeOfCard,
      startListOfRiders,
      control,
      form,
      statuses,
      rarities,
    };
    return (
      <FilterContext.Provider value={commonProps}>
        <Box py={6}>
          <Stack>
            {FilterComponents.map(({ Component, key }) => (
              <React.Fragment key={key}>
                {renderFilterComponent({
                  key,
                  components,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  defaultComponent: <Component />,
                  props: commonProps,
                })}
              </React.Fragment>
            ))}
          </Stack>
        </Box>
      </FilterContext.Provider>
    );
  }, [paramsCardFilter, form, components]);

  const filter = _.debounce((values, router) => {
    changeQueryRouter(router, { ...values, page: 1 });
  }, 1000);

  useEffect(() => {
    const subscription = watch((value, { type }) => {
      if (type) {
        filter(value, router);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, router]);

  useEffect(() => {
    if (isFirstSetValue && !_.isEmpty(router.query)) {
      reset(sanitizeFilter(router.query, defaultFilter));
      setIsFirstSetValue(false);
    }
  }, [router.query]);

  useEffect(() => {
    if (!isFirstSetValue && resetDataCondition) {
      reset({ ...getDefaultFilter(), ...defaultFilter });
    }
  }, [resetDataCondition]);

  return (
    <React.Fragment>
      <Box
        flexShrink={0}
        width={300}
        height="100%"
        display={['none', 'none', 'none', 'block']}
        {...rest}
      >
        {header}
        {cardFilter}
        {children}
      </Box>
      <BaseButton
        aria-label="filter"
        leftIcon={<Icon as={MdFilterList} />}
        pos="fixed"
        bottom={4}
        left="50%"
        zIndex="banner"
        onClick={onOpen}
        shadow="md"
        display={['flex', 'flex', 'flex', 'none']}
        variant="light"
        transform="translateX(-50%)"
        size="sm"
      >
        {t('filters')}
      </BaseButton>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>{cardFilter}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default Filter;
