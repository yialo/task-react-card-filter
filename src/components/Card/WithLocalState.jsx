import React, { useState } from 'react';

import Card from './index.jsx';

function WithState(props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <Card
      {...props}
      isChecked={isChecked}
      onCheck={handleCheck}
    />
  );
}

WithState.displayName = `withLocalState(${Card.name})`;

export default WithState;
