import React from 'react';

const TradeSide = ({ tradeSide, toggleTradeSide }) => (
  <div className="trade-type">
    <div
      className="btn-trade-type buy"
      onClick={() => toggleTradeSide('BUY')}
      onKeyPress={() => toggleTradeSide('BUY')}
      style={
        tradeSide === 'BUY' ?
        { color: '#fff', background: '#4da53c' } :
        { color: '#a9aaad', background: '#576068' }
      }
    >
      buy
    </div>
    <div
      className="btn-trade-type sell"
      onClick={() => toggleTradeSide('SELL')}
      onKeyPress={() => toggleTradeSide('SELL')}
      style={
        tradeSide === 'SELL' ?
        { color: '#fff', background: '#ff6939' } :
        { color: '#a9aaad', background: '#576068' }
      }
    >
      sell
    </div>
  </div>
);

export default TradeSide;
