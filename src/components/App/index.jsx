import './index.css';

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import axios from 'axios';

import Card from '../Card/WithLocalState.jsx';
import SearchField from '../SearchField/index.jsx';

import withClassList from '@/hocs/withClassList.jsx';

const AppCard = withClassList(Card, ['app__card']);
const AppFilterForNumber = withClassList(SearchField, ['app__filter', 'app__filter--number']);
const AppFilterForName = withClassList(SearchField, ['app__filter', 'app__filter--name']);

function App(props) {
  const {
    clientList,
    isNetworkError,
    onDataLoaded,
    onFilterByNumber,
    onFilterByName,
    onNetworkError,
  } = props;

  useEffect(() => {
    axios.get('/json/clients.json')
      .then((request) => {
        onDataLoaded(request.data.list);
      })
      .catch((err) => {
        onNetworkError();
        console.warn(err.message);
      });
  }, []);

  const getFilterHandler = (callback) => (
    (evt) => {
      callback(evt.target.value);
    }
  );

  return (
    <div className="app">
      <div className="app__searchbar" role="search">
        <AppFilterForNumber
          label="Введите номер заявки"
          placeholder="Номер заявки"
          onChange={getFilterHandler(onFilterByNumber)}
        />
        <AppFilterForName
          label="Укажите наименование клиента"
          placeholder="Наименование клиента"
          onChange={getFilterHandler(onFilterByName)}
        />
      </div>
      {
        (() => {
          let fallbackMessage = null;
          if (isNetworkError) {
            fallbackMessage = 'Ошибка сети';
          } else if (clientList === null) {
            fallbackMessage = 'Загружаем список клиентов...';
          } else if (clientList.length === 0) {
            fallbackMessage = 'Список клиентов пуст';
          }
          if (fallbackMessage) {
            return <p className="app__fallback-message">{fallbackMessage}</p>;
          }
          return clientList.map((dto) => <AppCard key={dto.id} dto={dto} />);
        })()
      }
    </div>
  );
}

App.defaultProps = {
  clientList: null,
};

App.propTypes = {
  clientList: PropTypes.arrayOf(PropTypes.object),
  isNetworkError: PropTypes.bool.isRequired,
  onDataLoaded: PropTypes.func.isRequired,
  onFilterByNumber: PropTypes.func.isRequired,
  onFilterByName: PropTypes.func.isRequired,
  onNetworkError: PropTypes.func.isRequired,
};

export default App;
