import React from 'react';

import createHOC from '@/utils/create-hoc.js';

export default createHOC(
    'ClassList',
    (WrappedComponent, classList) => (
      function WithClassList(props) {
        return <WrappedComponent {...props} classList={classList} />;
      }
    )
);
