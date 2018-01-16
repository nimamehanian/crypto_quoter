import React, { Component } from 'react';
import ProductSelector from '../ProductSelector';
import ProductModal from '../ProductModal';
import TradeSide from '../TradeSide';
import Quoter from '../Quoter';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="order-form">
        <div className="heading">
          <div className="left" />
          <div className="vertical-rule" />
          <ProductSelector
            isSelectorBeingHovered={this.props.isSelectorBeingHovered}
            isModalBeingHovered={this.props.isModalBeingHovered}
            hoverProductSelector={this.props.hoverProductSelector}
            leaveProductSelector={this.props.leaveProductSelector}
            toggleProductSelector={this.props.toggleProductSelector}
            currentProduct={this.props.currentProduct}
          />
          <div className="vertical-rule" />
        </div>
        <div className="wrapper">
          <ProductModal
            isSelectorBeingHovered={this.props.isSelectorBeingHovered}
            isModalBeingHovered={this.props.isModalBeingHovered}
            hoverProductModal={this.props.hoverProductModal}
            leaveProductModal={this.props.leaveProductModal}
            selectProduct={this.props.selectProduct}
          />
          <TradeSide
            tradeSide={this.props.tradeSide}
            toggleTradeSide={this.props.toggleTradeSide}
          />
          <Quoter
            calculateQuote={this.props.calculateQuote}
            baseCurrency={this.props.baseCurrency}
            quoteCurrency={this.props.quoteCurrency}
            isInputFiat={this.props.isInputFiat}
            tradeSide={this.props.tradeSide}
            unitPrice={this.props.unitPrice}
            total={this.props.total}
            amount={this.props.amount}
            baseMaxSize={this.props.baseMaxSize}
            updateAmount={this.props.updateAmount}
          />
        </div>
      </div>
    );
  }
}

export default OrderForm;
