import * as React from 'react';
import { PropTypes } from 'prop-types';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './RatesList.scss';

const RatesList = ({ rates }) => {
  const items = rates && rates.map((obj, index) => (
    <div key={index}>
      <h3>{obj.name}</h3>
      <div className="rate">
        <StarBorderIcon />
        {obj.rate}
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
