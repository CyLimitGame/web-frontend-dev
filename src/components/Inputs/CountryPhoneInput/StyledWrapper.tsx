import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

import colors from '@/theme/foundations/colors';

const StyledWrapper = styled(Box)`
  .PhoneInput {
    display: flex;
    align-items: center;
    height: 50px;
    background-color: ${colors.whiteAlpha[160]};
    padding: 8px 16px;
    border-radius: 6px;
  }

  .PhoneInputInput {
    flex: 1;
    min-width: 0;
    background-color: transparent;
  }

  .PhoneInputInput:focus-visible {
    outline-width: 0;
  }

  .PhoneInputCountryIcon {
    height: 1em;
  }

  .PhoneInputCountryIcon--square {
    width: 1em;
  }

  .PhoneInputCountryIcon--border {
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(0, 0, 0, 0.5);
  }

  .PhoneInputCountryIconImg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .PhoneInputInternationalIconPhone {
    opacity: 0.8;
  }

  .PhoneInputInternationalIconGlobe {
    opacity: 0.65;
  }

  .PhoneInputCountry {
    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    margin-right: 0.35em;
  }

  .PhoneInputCountrySelect {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    border: 0;
    opacity: 0;
    cursor: pointer;
  }

  .PhoneInputCountrySelect[disabled],
  .PhoneInputCountrySelect[readonly] {
    cursor: default;
  }

  .PhoneInputCountrySelectArrow {
    display: block;
    content: '';
    width: 0.3em;
    height: 0.3em;
    margin-left: 0.35em;
    border-style: solid;
    border-color: black;
    border-top-width: 0;
    border-bottom-width: 1px;
    border-left-width: 0;
    border-right-width: 1px;
    transform: rotate(45deg);
    opacity: 0.45;
  }

  .PhoneInputCountrySelect:focus
    + .PhoneInputCountryIcon
    + .PhoneInputCountrySelectArrow {
    opacity: 1;
    color: #03b2cb;
  }

  .PhoneInputCountrySelect:focus + .PhoneInputCountryIcon--border {
    box-shadow: 0 0 0 1px #03b2cb, inset 0 0 0 1px #03b2cb;
  }

  .PhoneInputCountrySelect:focus
    + .PhoneInputCountryIcon
    .PhoneInputInternationalIconGlobe {
    opacity: 1;
    color: #03b2cb;
  }
`;

export default StyledWrapper;
