import React from 'react';

import getWrappedComponentName from '@/utils/get-wrapped-component-name.js';

export default (WrappedComponent, outerClassList) => {
  function WithOuterClassList(props) {
    return (
      <WrappedComponent
        {...props}
        {...{ outerClassList }}
      />
    );
  }

  const wrappedComponentName = getWrappedComponentName(WrappedComponent);
  WithOuterClassList.displayName = `withOuterClassList(${wrappedComponentName})`;

  return WithOuterClassList;
};
