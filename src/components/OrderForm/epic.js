import Rx from 'rxjs/Rx';
import { CALCULATE_QUOTE, RECEIVE_QUOTE } from './actionTypes';

const receiveQuote = ({
  amount,
  wtAvgPrice,
  quantityAccrued,
  isCryptoToCrypto,
  isC2CAndInputBTC,
  isInputFiat,
}) => ({
  type: RECEIVE_QUOTE,
  unitPrice: !+amount ?
    (isInputFiat || isCryptoToCrypto ? '0.00000000' : '0.00') :
    (isInputFiat ?
      `${((+amount / wtAvgPrice) / +amount).toFixed(8)}` :
      `${wtAvgPrice.toFixed(isCryptoToCrypto ? 8 : 2)}`),
  total: isInputFiat ?
    `${quantityAccrued.toFixed(8)}` :
    (isC2CAndInputBTC ? `${(quantityAccrued / wtAvgPrice).toFixed(8)}` :
      `${(quantityAccrued * wtAvgPrice).toFixed(isCryptoToCrypto ? 8 : 2)}`),
});

const calculateQuoteEpic = (action$, store) =>
  action$.ofType(CALCULATE_QUOTE)
    .debounceTime(100)
    .switchMap(({ amount }) => {
      const {
        isInputFiat,
        currentProduct,
        quoteCurrency,
        tradeSide,
      } = store.getState().orderForm;
      const books = store.getState().app.orderBooks;
      const product = currentProduct.replace('/', '-');
      const side = tradeSide === 'BUY' ? 'asks' : 'bids';
      const isCryptoToCrypto = quoteCurrency === 'BTC';
      // If book is crypto-to-crypto AND amount entered is in BTC...
      const isC2CAndInputBTC = isCryptoToCrypto && tradeSide === 'BUY';

      // USD -> EUR
      // How many BTC = EUR?
      // Log amount in EUR
      const intermediaryCurrency = 'ETH';
      const destinationCurrency = 'EUR';

      return Rx.Observable.from(books[product][side])
        .scan(({ amountAccrued, quantityAccrued }, order) => {
          const [price, quantity, numOfOrders] = order;

          const isInputExceedingOrder = isInputFiat ?
            +amount > amountAccrued + (+price * +quantity * +numOfOrders) :
            +amount > quantityAccrued + (+quantity * +numOfOrders);

          const amountOfOrder = isInputExceedingOrder ?
            +price * +quantity * +numOfOrders :
            (isInputFiat ? +amount - amountAccrued :
              (isC2CAndInputBTC ? +price : 1) * (+amount - quantityAccrued)
            );

          // Is entered amount greater than the accrued quantities plus that of the current order?
          const quantityOfOrder = isInputExceedingOrder ?
            // Then consume entire order
            +quantity * +numOfOrders :
            (isInputFiat ?
              // Remaining fiat amount / going order price = some % of 1 quantity
              amountOfOrder / +price :
              // Partially fulfill order
              +amount - quantityAccrued);

          // Formula: ❨𝑝𝐴 × 𝑞𝐴❩ + ❨𝑝𝐵 × 𝑞𝐵❩ + ⋯ + ❨𝑝𝑁𝑡ℎ × 𝑞𝑁𝑡ℎ❩ ÷ 𝑎𝑚𝑜𝑢𝑛𝑡
          return {
            amountAccrued: amountAccrued + amountOfOrder,
            quantityAccrued: quantityAccrued + quantityOfOrder,
            wtAvgPrice: amountAccrued / quantityAccrued || +price,
          };
        }, { amountAccrued: 0, quantityAccrued: 0 })
        .takeWhile(({ amountAccrued, quantityAccrued }) =>
          (isInputFiat ? amountAccrued : quantityAccrued) <= +amount)
        .distinctUntilKeyChanged((isInputFiat ? 'amountAccrued' : 'quantityAccrued'))
        .flatMap(({ quantityAccrued }) =>
          Rx.Observable.from(books[`${intermediaryCurrency}-${destinationCurrency}`]['asks'])
            .scan((x, order) => {
              console.log(quantityAccrued);
              return order[0] * quantityAccrued;
            }, {})
        )
        .do(x => console.log(x))
        .ignoreElements();
        // .map(({ quantityAccrued, wtAvgPrice }) =>
        //   receiveQuote({
        //     isCryptoToCrypto,
        //     isC2CAndInputBTC,
        //     isInputFiat,
        //     amount,
        //     quantityAccrued,
        //     wtAvgPrice,
        //   }));
    });

export default calculateQuoteEpic;
