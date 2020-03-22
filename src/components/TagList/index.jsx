import './index.css';

import PropTypes from 'prop-types';
import React from 'react';

function TagList(props) {
  return (
    props.list.length > 0 ? (
      <ul className={['tag-list'].concat(props.classList).join(' ')}>
        {props.list.map((tag, i) => (
          <li className="tag-list__item" key={i}>{tag}</li>
        ))}
      </ul>
    ) : null
  );
}

TagList.defaultProps = {
  classList: [],
};

TagList.propTypes = {
  classList: PropTypes.arrayOf(PropTypes.string),
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagList;
