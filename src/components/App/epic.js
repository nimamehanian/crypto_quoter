import Rx from 'rxjs/Rx';
import {
  LOAD_ORDERBOOKS,
  RECEIVE_ALL_ORDERBOOKS,
  FAIL_ORDERBOOK_REQUEST
} from './actionTypes';

const { forkJoin, ajax } = Rx.Observable;

const orderBookUrl = product =>
  `https://api.gdax.com/products/${product}/book?level=2`;

const products = [
  'BTC-USD', 'BTC-EUR', 'BTC-GBP',
  'ETH-BTC', 'ETH-USD', 'ETH-EUR',
  'LTC-BTC', 'LTC-USD', 'LTC-EUR',
];

const receiveOrderBooksAction = ({ product, bids, asks }) => ({
  type: `RECEIVE_${product}`, bids, asks, product,
});

const receiveAllOrderBooks = () => ({
  type: RECEIVE_ALL_ORDERBOOKS,
});

const loadOrderBooksEpic = action$ =>
  action$.ofType(LOAD_ORDERBOOKS)
    // Triple the golden ratio in ms, to simulate loading, just for effect
    .delay(1854)
    .switchMap(() => Rx.Observable.of(products
      // Map products to URLs
      .map(product => orderBookUrl(product))
      // Map URLs to AJAX requests
      .map(url => ajax({ url, headers: {}, crossDomain: true })))
      // Execute all requests
      // forkJoin is akin to Promise.all
      .flatMap(requests => forkJoin(requests))
      // We `flatMap` again, because, at this moment, our data structure
      // is an Observable of Observables of actions, whereas we need to
      // return just an Observable of actions (i.e., an action stream).
      // So we flatten by one level.
      .flatMap(responses => responses.map(({ response: { bids, asks } }, idx) =>
        receiveOrderBooksAction({ product: products[idx], bids, asks })))
      // `RECEIVE_ALL_ORDERBOOKS` only fires upon all order book calls succeeding
      .concat(Rx.Observable.of(receiveAllOrderBooks()))
      // Conversely, if any calls fail, `FAIL_ORDERBOOK_REQUEST` is emitted,
      // because without all order book data present, we cannot compare rates
      .catch(error =>
        Rx.Observable.of({ type: FAIL_ORDERBOOK_REQUEST, error })));

export default loadOrderBooksEpic;
