import {
  HOVER_PRODUCT_SELECTOR,
  LEAVE_PRODUCT_SELECTOR,
  TOGGLE_PRODUCT_SELECTOR,
  HOVER_PRODUCT_MODAL,
  LEAVE_PRODUCT_MODAL,
  SELECT_PRODUCT,
  SELECT_BUY,
  SELECT_SELL,
  CHECK_WHETHER_INPUT_IS_FIAT,
  UPDATE_AMOUNT,
  RECEIVE_QUOTE
} from './actionTypes';
import { isFiat } from '../../utils/checkCurrencyType';

const initialState = {
  isSelectorBeingHovered: false,
  isModalBeingHovered: false,
  isInputFiat: true,
  tradeSide: 'BUY',
  currentProduct: 'BTC/USD',
  baseCurrency: 'BTC',
  quoteCurrency: 'USD',
  baseMaxSize: 250,
  amount: '',
  unitPrice: '0.00000000',
  total: '0.00000000',
};

const baseMaxSizes = { BTC: 250, ETH: 5000, LTC: 1000000 };

const orderFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOVER_PRODUCT_SELECTOR:
      return { ...state, isSelectorBeingHovered: true };
    case LEAVE_PRODUCT_SELECTOR:
      return { ...state, isSelectorBeingHovered: false };
    case TOGGLE_PRODUCT_SELECTOR:
      return {
        ...state,
        isSelectorBeingHovered: !state.isSelectorBeingHovered,
      };
    case HOVER_PRODUCT_MODAL:
      return { ...state, isModalBeingHovered: true };
    case LEAVE_PRODUCT_MODAL:
      return { ...state, isModalBeingHovered: false };
    case SELECT_PRODUCT:
      return {
        ...state,
        isModalBeingHovered: false,
        tradeSide: 'BUY',
        currentProduct: action.currentProduct,
        baseCurrency: action.currentProduct.split('/')[0],
        quoteCurrency: action.currentProduct.split('/')[1],
        baseMaxSize: baseMaxSizes[action.currentProduct.split('/')[0]],
        amount: '',
        unitPrice: '0.00000000',
        total: '0.00000000',
      };
    case SELECT_BUY:
      return {
        ...state,
        tradeSide: action.tradeSide,
        amount: '',
        unitPrice: '0.00000000',
        total: '0.00000000',
      };
    case SELECT_SELL:
      return {
        ...state,
        tradeSide: action.tradeSide,
        amount: '',
        unitPrice: state.quoteCurrency === 'BTC' ? '0.00000000' : '0.00',
        total: state.quoteCurrency === 'BTC' ? '0.00000000' : '0.00',
      };
    case CHECK_WHETHER_INPUT_IS_FIAT:
      return {
        ...state,
        isInputFiat: state.tradeSide === 'BUY' && isFiat(state.quoteCurrency),
      };
    case UPDATE_AMOUNT:
      return { ...state, amount: action.amount };
    case RECEIVE_QUOTE:
      return {
        ...state,
        unitPrice: `${action.unitPrice}`,
        total: `${action.total}`,
      };
    default:
      return state;
  }
};

export default orderFormReducer;
