import Type from './action-types.js';

const {
  FETCH_CLIENT_LIST,
  FETCH_ERROR,
  FILTER_BY_NAME,
  FILTER_BY_NUMBER,
} = Type;

export const initialState = {
  clientList: null,
  isNetworkError: false,
};

const Handler = {
  [FETCH_CLIENT_LIST]: (state, payload) => ({
    ...state,
    clientList: payload,
  }),
  [FETCH_ERROR]: (state) => ({
    ...state,
    isNetworkError: true,
  }),
  DEFAULT: (state) => state,
};

export default (state, action) => {
  const handle = Handler[action.type] ?? Handler.DEFAULT;
  return handle(state, action.payload);
};
