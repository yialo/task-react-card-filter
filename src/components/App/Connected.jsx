import { connect } from 'react-redux';

import App from './index.jsx';
import ActionCreator from '@/store/action-creator.js';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  clientList: state.clientList,
  isNetworkError: state.isNetworkError,
});

const mapDispatchToProps = (dispatch) => ({
  onDataLoaded: (list) => {
    dispatch(ActionCreator.fetchClientList(list));
  },
  onFilterByNumber: (numberValue) => {},
  onFilterByName: (nameValue) => {},
  onNetworkError: () => {
    dispatch(ActionCreator.throwFetchError());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
