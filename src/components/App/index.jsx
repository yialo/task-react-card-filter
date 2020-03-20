import PropTypes from 'prop-types';
import React from 'react';

import Input from '../Input/index.jsx';

function App(props) {
  return (
    <div className="app">
      <div className="app__header">
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
      </div>
      <div className="app__body"></div>
    </div>
  );
}

export default App;
