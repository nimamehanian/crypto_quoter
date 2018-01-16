import React from 'react';

const ProductSelector = props => (
  <div
    className="product-selector"
    onMouseEnter={props.hoverProductSelector}
    onMouseLeave={props.leaveProductSelector}
    onClick={props.toggleProductSelector}
    onKeyPress={props.toggleProductSelector}
  >
    <div className="label">
      <div
        className="current-product"
        style={{
          color:
            props.isSelectorBeingHovered ||
            props.isModalBeingHovered ?
            '#5e9cdb' : '#444f56',
        }}
      >
        {props.currentProduct}
      </div>
      <div className="prompt">select product</div>
    </div>
    <i className="ion-chevron-down" />
  </div>
);

export default ProductSelector;
