import React from 'react';

import Card from '../Card/index.jsx';
import Input from '../Input/index.jsx';

import withClassList from '@/hocs/withClassList.jsx';

const AppFilter = withClassList(Input, ['app__filter']);

function App() {
  return (
    <div className="app">
      <div className="app__searchbar" role="search">
        <AppFilter
          label="Введите номер заявки"
          placeholder="Номер заявки"
          onChange={() => {
            // STUB:
            console.log('Changed!');
          }}
        />
        <AppFilter
          label="Укажите наименование клиента"
          placeholder="Наименование клиента"
          onChange={() => {
            // STUB:
            console.log('Changed!');
          }}
        />
      </div>
      <Card />
    </div>
  );
}

export default App;
