import { connect } from 'react-redux';
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
  CALCULATE_QUOTE
} from './actionTypes';
import OrderForm from './OrderForm';

const mapStateToProps = state => ({
  isSelectorBeingHovered: state.orderForm.isSelectorBeingHovered,
  isModalBeingHovered: state.orderForm.isModalBeingHovered,
  isInputFiat: state.orderForm.isInputFiat,
  tradeSide: state.orderForm.tradeSide,
  currentProduct: state.orderForm.currentProduct,
  baseCurrency: state.orderForm.baseCurrency,
  quoteCurrency: state.orderForm.quoteCurrency,
  amount: state.orderForm.amount,
  baseMaxSize: state.orderForm.baseMaxSize,
  unitPrice: state.orderForm.unitPrice,
  total: state.orderForm.total,
});

const mapDispatchToProps = dispatch => ({
  hoverProductSelector() {
    dispatch({ type: HOVER_PRODUCT_SELECTOR });
  },

  leaveProductSelector() {
    dispatch({ type: LEAVE_PRODUCT_SELECTOR });
  },

  hoverProductModal() {
    dispatch({ type: HOVER_PRODUCT_MODAL });
  },

  leaveProductModal() {
    dispatch({ type: LEAVE_PRODUCT_MODAL });
  },

  selectProduct(currentProduct) {
    dispatch({ type: SELECT_PRODUCT, currentProduct });
    dispatch({ type: CHECK_WHETHER_INPUT_IS_FIAT });
  },

  toggleProductSelector() {
    dispatch({ type: TOGGLE_PRODUCT_SELECTOR });
  },

  toggleTradeSide(tradeSide) {
    const type = tradeSide === 'BUY' ? SELECT_BUY : SELECT_SELL;
    dispatch({ type, tradeSide });
    dispatch({ type: CHECK_WHETHER_INPUT_IS_FIAT });
  },

  updateAmount(amount) {
    dispatch({ type: UPDATE_AMOUNT, amount });
  },

  calculateQuote(amount) {
    dispatch({ type: CALCULATE_QUOTE, amount });
  },
});

const OrderFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderForm);

export default OrderFormContainer;
