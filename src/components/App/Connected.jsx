import { connect } from 'react-redux';

import App from './index.jsx';
import ActionCreator from '@/store/action-creator.js';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  clientList: state.filteredList,
  isNetworkError: state.isNetworkError,
});

const mapDispatchToProps = (dispatch) => ({
  onDataLoaded: (list) => {
    dispatch(ActionCreator.fetchClientList(list));
  },
  onFilterByName: (nameValue) => {
    dispatch(ActionCreator.filterClientList('name', nameValue));
  },
  onFilterByNumber: (numberValue) => {
    dispatch(ActionCreator.filterClientList('number', numberValue));
  },
  onNetworkError: () => {
    dispatch(ActionCreator.throwFetchError());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
