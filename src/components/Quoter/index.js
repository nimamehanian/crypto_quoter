import React, { Component } from 'react';
import takeRightWhile from 'lodash/takeRightWhile';
import dropRightWhile from 'lodash/dropRightWhile';

class Quoter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    this.props.updateAmount(value);
    this.props.calculateQuote(value);
  }

  render() {
    const {
      amount,
      baseCurrency,
      quoteCurrency,
      tradeSide,
      isInputFiat,
      unitPrice,
      total,
    } = this.props;

    return (
      <div className="quoter">
        <div className="amount-field">
          <span className="label">Amount</span>
          <span className="currency">
            {tradeSide === 'BUY' ? quoteCurrency : baseCurrency}
          </span>
          <input
            type="text"
            maxLength="10"
            name="amount"
            placeholder="0.00"
            autoComplete="off"
            value={amount}
            onChange={(e) => {
              // Allow integers and floating-point numbers only
              // If entered amount is a fiat currency, limit value to two sig figs after decimal
              const re = isInputFiat ?
                /^[+-]?\d*\.\d{1,2}$|^[+-]?\d+(\.\d{0,2})?$/g :
                /^[+-]?\d*\.\d+$|^[+-]?\d+(\.\d*)?$/g;
              if (re.test(e.target.value) || !e.target.value) {
                this.handleOnChange(e.target.value);
              }
            }}
          />
        </div>

        <div className="quote unit-price">
          <span className="label">
            Unit Price
            <span className="almost-equal-to-symbol">≈</span>
          </span>
          <span className="value">
            {amount.length && unitPrice.split('.')[1].length > 2 ?
              dropRightWhile(unitPrice, char => char === '0') : unitPrice
            }
            <span className="insig-fig">
              {amount.length && unitPrice.split('.')[1].length > 2 ?
                takeRightWhile(unitPrice, char => char === '0') : ''
              }
            </span>
          </span>
        </div>

        <div className="quote">
          <span className="label">
            Total&nbsp;
            <span className="currency">
              ({tradeSide === 'BUY' ? baseCurrency : quoteCurrency})
            </span>
            <span className="almost-equal-to-symbol">≈</span>
          </span>
          <span className="value">
            {amount.length && total.split('.')[1].length > 2 ?
              dropRightWhile(total, char => char === '0') : total
            }
            <span className="insig-fig">
              {amount.length && total.split('.')[1].length > 2 ?
                takeRightWhile(total, char => char === '0') : ''
              }
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default Quoter;
