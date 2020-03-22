import './index.css';

import PropTypes from 'prop-types';
import React from 'react';

import TagList from '../TagList/index.jsx';

import withClassList from '@/hocs/withClassList.jsx';

const CardTagList = withClassList(TagList, ['card__taglist']);

function Card(props) {
  const {
    date,
    id,
    name,
    organization,
    ptrn,
    sum,
    topTagList,
    bottomTagList,
  } = props.dto;

  return (
    <article
      className={
        ['card'].concat(props.classList)
          .concat(props.isChecked ? 'js_checked' : [])
          .join(' ')
      }
    >
      <label className="card__check-line">
        <span className="card__tip">Проверить данные клиента</span>
        <input
          className="s_visually-hidden"
          type="checkbox"
          checked={props.isChecked}
          name="need_client_check"
          onChange={props.onCheck}
        />
        <span className="card__checkbox" aria-hidden="true" />
      </label>
      <p className="s_regular-text card__sum">{sum}</p>
      <p className="s_regular-text card__organization">{organization}</p>
      <p className="s_pale-text card__ptrn">{`ИНН ${ptrn}`}</p>
      <CardTagList list={topTagList} />
      <p className="s_regular-text card__name">{name}</p>
      <CardTagList list={bottomTagList} />
      <p className="s_pale-text card__footer">
        <span className="card__id">{id}</span>
        <span>{`от ${date}`}</span>
      </p>
    </article>
  );
}

Card.defaultProps = {
  classList: [],
};

Card.propTypes = {
  classList: PropTypes.arrayOf(PropTypes.string),
  dto: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
  ])).isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default Card;
