import Type from './action-types.js';

const {
  FETCH_ERROR,
  FETCH_CLIENT_LIST,
  FILTER_CLIENT_LIST,
} = Type;

export const initialState = {
  clientList: null,
  filteredList: null,
  isNetworkError: false,
};

const filterNameToClientField = {
  'name': 'name',
  'number': 'id',
};

const Handler = {
  [FETCH_ERROR]: (state) => ({
    ...state,
    isNetworkError: true,
  }),
  [FETCH_CLIENT_LIST]: (state, payload) => ({
    ...state,
    clientList: payload,
    filteredList: payload,
  }),
  [FILTER_CLIENT_LIST]: (state, payload) => {
    const { filterName, substrToSearch } = payload;
    if (substrToSearch === '') {
      return {
        ...state,
        filteredList: state.clientList,
      };
    }
    const fieldToCheck = filterNameToClientField[filterName];
    const filteredList = state.clientList.filter((client) => (
      String(client[fieldToCheck]).match(substrToSearch)
    ));
    return {
      ...state,
      filteredList,
    };
  },
  DEFAULT: (state) => state,
};

export default (state, action) => {
  const handle = Handler[action.type] ?? Handler.DEFAULT;
  return handle(state, action.payload);
};
