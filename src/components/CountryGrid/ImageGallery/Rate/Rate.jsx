import * as React from 'react';
import { PropTypes } from 'prop-types';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './Rate.scss';

const Rate = ({ rates }) => {
  const rate = rates && rates.reduce((prev, rate) => rate.rate + prev, 0) / rates.length;
  return (
    <div className="rate">
      <StarBorderIcon />
      {rate && rate.toFixed(2) || 5}
    </div>
  )
}

Rate.propTypes = {
  rates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rate: PropTypes.number,
    })
  ).isRequired,
};

export default Rate;
