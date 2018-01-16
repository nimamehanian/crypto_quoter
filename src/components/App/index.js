import { connect } from 'react-redux';
import { LOAD_ORDERBOOKS } from './actionTypes';
import App from './App';

const mapStateToProps = state => ({
  areOrderBooksLoading: state.app.areOrderBooksLoading,
  error: state.app.error,
});

const mapDispatchToProps = dispatch => ({
  loadOrderBooks() {
    dispatch({ type: LOAD_ORDERBOOKS });
  },
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
