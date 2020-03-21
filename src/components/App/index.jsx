import React from 'react';

import InputWithClassList from '../Input/WithClassList.jsx';
import Card from '../Card/index.jsx';

function App() {
  return (
    <div className="app">
      <div className="app__searchbar" role="search">
        <InputWithClassList
          label="Введите номер заявки"
          placeholder="Номер заявки"
          onChange={() => {
            console.log('Changed!');
          }}
        />
        <InputWithClassList
          label="Укажите наименование клиента"
          placeholder="Наименование клиента"
          onChange={() => {
            console.log('Changed!');
          }}
        />
      </div>
      <Card />
    </div>
  );
}

export default App;
