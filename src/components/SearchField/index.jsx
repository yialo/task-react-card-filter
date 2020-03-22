import './index.css';

import PropTypes from 'prop-types';
import React from 'react';

function SearchField(props) {
  return (
    <label
      className={['search-field'].concat(props.classList).join(' ')}
      aria-label={props.label}
    >
      <input
        className="search-field__input"
        type="text"
        inputMode="search"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </label>
  );
}

SearchField.defaultProps = {
  classList: [],
};

SearchField.propTypes = {
  classList: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchField;
