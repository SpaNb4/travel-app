import * as React from 'react';
import { PropTypes } from 'prop-types';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './Rate.scss';

const Rate = ({ rates }) => {
  const rate = rates && (rates.reduce((prev, rate) => rate.rate + prev, 0) / rates.length).toFixed(2);
  return (
    <div className="rate">
      <StarBorderIcon />
      {rate || '0'}
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
