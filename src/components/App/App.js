import React, { Component } from 'react';
import Spinner from '../Spinner';
import OrderForm from '../OrderForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loadOrderBooks();
  }

  render() {
    const {
      areOrderBooksLoading,
      error: { message: errorMessage },
    } = this.props;
    return (
      <div className="app">
        {errorMessage.length ?
          <div className="error-message">
            <span role="img" aria-label="ios-confused-face-emoji">😕</span>
            <div className="msg">
              It seems as though either the WiFi is down
              or we are hitting an unknown endpoint,
              because we cannot load the app data.
            </div>
          </div> :
          areOrderBooksLoading ? <Spinner /> : <OrderForm />
        }
      </div>
    );
  }
}

export default App;
