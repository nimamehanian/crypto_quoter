import React, { Component } from 'react';
import classnames from 'classnames';

class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const pdmClasses = classnames({
      'product-modal': true,
      'fade-in': this.props.isSelectorBeingHovered || this.props.isModalBeingHovered,
    });

    return (
      <div
        className={pdmClasses}
        onMouseEnter={this.props.hoverProductModal}
        onMouseLeave={this.props.leaveProductModal}
        style={{
          display:
            this.props.isSelectorBeingHovered ||
            this.props.isModalBeingHovered ?
            'block' : 'none',
        }}
      >
        <div className="up-arrow" />
        {[
          { base: 'BITCOIN', products: ['BTC/USD', 'BTC/EUR', 'BTC/GBP'] },
          { base: 'ETHER', products: ['ETH/BTC', 'ETH/USD', 'ETH/EUR'] },
          { base: 'LITECOIN', products: ['LTC/BTC', 'LTC/USD', 'LTC/EUR'] },
        ].map((section, idx) => (
          <div className="product-section" key={`section_${idx + 1}`}>
            <div className="title">{section.base}</div>
            <ul className="products">
              {section.products.map((product, i) => (
                <li
                  className="product"
                  onClick={() => this.props.selectProduct(product)}
                  onKeyPress={() => this.props.selectProduct(product)}
                  key={`product_${i + 1}`}
                >
                  {product}
                </li>))
              }
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductModal;
