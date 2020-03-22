import Type from './action-types.js';

const {
  FETCH_ERROR,
  FETCH_CLIENT_LIST,
  FILTER_CLIENT_LIST,
} = Type;

export default {
  fetchClientList: (clientList) => ({
    type: FETCH_CLIENT_LIST,
    payload: clientList,
  }),
  filterClientList: (filterName, rawSubstr) => ({
    type: FILTER_CLIENT_LIST,
    payload: {
      filterName,
      substrToSearch: rawSubstr.trim(),
    },
  }),
  throwFetchError: () => ({
    type: FETCH_ERROR,
  }),
};
