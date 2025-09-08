import { extendTheme } from '@chakra-ui/react';

import styles from './styles';
import config from './foundations/config';
import fonts from './foundations/fonts';
import colors from './foundations/colors';
import shadows from './foundations/shadows';
import breakpoints from './foundations/breakpoints';
import zIndices from './foundations/zIndices';
import fontWeights from './foundations/fontWeights';
import sizes from './foundations/sizes';
import fontSizes from './foundations/fontSizes';
import radii from './foundations/borderRadius';
import space from './foundations/space';
import Button from './components/button';
import Input from './components/input';
import NumberInput from './components/numberInput';
import Tabs from './components/tab';
import Modal from './components/modal';
import Accordion from './components/accordion';
import Card from './components/card';
import Text from './components/text';
import Table from './components/table';
import Select from './components/select';
import FormLabel from './components/formLabel';
import Checkbox from './components/checkbox';
import Popover from './components/popover';
import Drawer from './components/drawer';
import Switch from './components/switch';
import Tooltip from './components/tooltip';

const customTheme = {
  colors,
  styles,
  fonts,
  config,
  shadows,
  breakpoints,
  zIndices,
  fontWeights,
  fontSizes,
  space,
  sizes,
  radii,
  components: {
    Button,
    Input,
    NumberInput,
    Tabs,
    Modal,
    Accordion,
    Card,
    Text,
    Table,
    Select,
    FormLabel,
    Checkbox,
    Popover,
    Drawer,
    Switch,
    Tooltip,
  },
};

export default extendTheme(customTheme);
