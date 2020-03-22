import Type from './action-types.js';

export default {
  fetchClientList: (clientList) => ({
    type: Type.FETCH_CLIENT_LIST,
    payload: clientList,
  }),
  throwFetchError: () => ({
    type: Type.FETCH_ERROR,
  }),
};
