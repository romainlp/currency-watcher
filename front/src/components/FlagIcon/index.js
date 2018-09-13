import * as React from 'react';
import FlagIconFactory from 'react-flag-icon-css';

// const FlagIcon = FlagIconFactory(React)
// If you are not using css modules, write the following:
const FlagIcon = FlagIconFactory(React, { useCssModules: false });

FlagIcon.getCountryCodeFromCurrency = (currency) => {
  if (currency === 'AUD') {
    return 'au';
  }
  if (currency === 'EUR') {
    return 'eu';
  }
  if (currency === 'GBP') {
    return 'gb';
  }
  if (currency === 'USD') {
    return 'us';
  }
  return 'eu';
}

export default FlagIcon;
