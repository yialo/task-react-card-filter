import './index.css';

import PropTypes from 'prop-types';
import React from 'react';

import Card from '../Card/index.jsx';
import SearchField from '../SearchField/index.jsx';

import withClassList from '@/hocs/withClassList.jsx';

import clientData from '@/static/clients.json';

const AppCard = withClassList(Card, ['app__card']);
const AppFilter = withClassList(SearchField, ['app__filter']);

const INITIAL_CLIENT_LIST = clientData.list;

function App(props) {
  return (
    <div className="app">
      <div className="app__searchbar" role="search">
        <AppFilter
          label="Введите номер заявки"
          placeholder="Номер заявки"
          onChange={props.onFilterByNumber}
        />
        <AppFilter
          label="Укажите наименование клиента"
          placeholder="Наименование клиента"
          onChange={props.onFilterByName}
        />
      </div>
      {
        INITIAL_CLIENT_LIST.length > 0 ? (
          INITIAL_CLIENT_LIST.map((dto) => <AppCard key={dto.id} dto={dto} />)
        ) : <p>Список пуст</p>
      }
    </div>
  );
}

App.propTypes = {
  onFilterByNumber: PropTypes.func.isRequired,
  onFilterByName: PropTypes.func.isRequired,
};

export default App;
