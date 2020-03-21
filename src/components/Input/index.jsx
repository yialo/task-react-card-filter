import PropTypes from 'prop-types';
import React from 'react';

function Input(props) {
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

Input.defaultProps = {
  classList: [],
};

Input.propTypes = {
  classList: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
