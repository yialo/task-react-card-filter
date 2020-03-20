import PropTypes from 'prop-types';
import React from 'react';

// TODO: add 'withOuterClassname' HOC
function Input(props) {
  return (
    <label className="search-field">
      <input
        className={`search-field__input${
          props.outerClassName ? ` ${props.outerClassName}` : ''
        }`}
        type="text"
        inputMode="search"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </label>
  );
}

Input.defaultProps = {
  outerClassName: null,
};

Input.propTypes = {
  outerClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
