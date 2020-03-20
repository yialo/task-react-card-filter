import PropTypes from 'prop-types';
import React from 'react';

import Input from '../Input/index.jsx';
import Card from '../Card/index.jsx';

function App(props) {
  return (
    <div className="app">
      <form className="app__searchbar" role="search">
        <Input
          outerClassName="app__filter"
          placeholder="Номер заявки"
          onChange={() => {
            console.log('Changed!');
          }}
        />
        <Input
          outerClassName="app__filter"
          placeholder="Наименование клиента"
          onChange={() => {
            console.log('Changed!');
          }}
        />
      </form>
      <Card />
    </div>
  );
}

export default App;
