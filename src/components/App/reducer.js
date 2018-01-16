import {
  LOAD_ORDERBOOKS,
  RECEIVE_ALL_ORDERBOOKS,
  FAIL_ORDERBOOK_REQUEST
} from './actionTypes';

const initialState = {
  orderBooks: {
    'BTC-USD': { bids: [], asks: [] },
    'BTC-EUR': { bids: [], asks: [] },
    'BTC-GBP': { bids: [], asks: [] },
    'ETH-BTC': { bids: [], asks: [] },
    'ETH-USD': { bids: [], asks: [] },
    'ETH-EUR': { bids: [], asks: [] },
    'LTC-BTC': { bids: [], asks: [] },
    'LTC-USD': { bids: [], asks: [] },
    'LTC-EUR': { bids: [], asks: [] },
  },
  areOrderBooksLoading: false,
  error: { message: '' },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERBOOKS:
      return { ...state, areOrderBooksLoading: true };
    case 'RECEIVE_BTC-USD':
      return {
        ...state,
        orderBooks: {
          ...state.orderBooks,
          'BTC-USD': {
            bids: action.bids,
            asks: action.asks,
          },
        },
      };
    case 'RECEIVE_BTC-EUR':
      return {
        ...state,
        orderBooks: {
          ...state.orderBooks,
          'BTC-EUR': {
            bids: action.bids,
            asks: action.asks,
          },
        },
      };
    case 'RECEIVE_BTC-GBP':
      return {
        ...state,
        orderBooks: {
          ...state.orderBooks,
          'BTC-GBP': {
            bids: action.bids,
            asks: action.asks,
          },
        },
      };
    case 'RECEIVE_ETH-BTC':
      return {
        ...state,
        orderBooks: {
          ...state.orderBooks,
          'ETH-BTC': {
            bids: action.bids,
            asks: action.asks,
          },
        },
      };
    case 'RECEIVE_ETH-USD':
      return {
        ...state,
        orderBooks: {
          ...state.orderBooks,
          'ETH-USD': {
            bids: action.bids,
            asks: action.asks,
          },
        },
      };
    case 'RECEIVE_ETH-EUR':
      return {
        ...state,
        orderBooks: {
          ...state.orderBooks,
          'ETH-EUR': {
            bids: action.bids,
            asks: action.asks,
          },
        },
      };
    case 'RECEIVE_LTC-BTC':
      return {
        ...state,
        orderBooks: {
          ...state.orderBooks,
          'LTC-BTC': {
            bids: action.bids,
            asks: action.asks,
          },
        },
      };
    case 'RECEIVE_LTC-USD':
      return {
        ...state,
        orderBooks: {
          ...state.orderBooks,
          'LTC-USD': {
            bids: action.bids,
            asks: action.asks,
          },
        },
      };
    case 'RECEIVE_LTC-EUR':
      return {
        ...state,
        orderBooks: {
          ...state.orderBooks,
          'LTC-EUR': {
            bids: action.bids,
            asks: action.asks,
          },
        },
      };
    case RECEIVE_ALL_ORDERBOOKS:
      return { ...state, areOrderBooksLoading: false };
    case FAIL_ORDERBOOK_REQUEST:
      return { ...state, areOrderBooksLoading: false, error: action.error };
    default:
      return state;
  }
};

export default appReducer;
