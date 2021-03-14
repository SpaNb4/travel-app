import * as React from 'react';
import { PropTypes } from 'prop-types';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './RatesList.scss';

const RatesList = ({ rates }) => {
  const items = rates && rates.map((rate, index) => (
    <div key={Date.now() + rate.name + index}>
      <h3>{rate.name}</h3>
      <div className="rate">
        <StarBorderIcon />
        {rate.rate}
      </div>
    </div>
  ))
  return (
    <div className="rate-list__container">
      <div className="rate-list">
        {items || (<div>No rates yet</div>)}
      </div>
    </div>
  )
}

RatesList.propTypes = {
  rates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rate: PropTypes.number,
    })
  ).isRequired,
};

export default RatesList;
