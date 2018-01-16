import includes from 'lodash/includes';

export const isFiat = currency => includes(['USD', 'EUR', 'GBP'], currency);
export const isCrypto = currency => includes(['BTC', 'ETH', 'LTC'], currency);
export const isCryptoToCrypto = (currencyOne, currencyTwo) => (
  includes(['BTC', 'ETH', 'LTC'], currencyOne) &&
  includes(['BTC', 'ETH', 'LTC'], currencyTwo)
);
