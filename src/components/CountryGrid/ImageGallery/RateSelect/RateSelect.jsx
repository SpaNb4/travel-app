import * as React from 'react';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RateSelect.scss';

import { getUsername, getCurrLng } from '../../../../store/app/slices';
import { setRate } from '../../../../store/country/actions';
import { getCurrentId } from '../../../../store/country/slices';

const RATES = [
  { rate: 5, checked: false},
  { rate: 4, checked: false},
  { rate: 3, checked: false},
  { rate: 2, checked: false},
  { rate: 1, checked: false},
];

const RateSelect = ({ place }) => {
  const dispatch = useDispatch();
  const [rateValue, setRateValue] = useState(0);
  const username = useSelector(getUsername);
  const currLng = useSelector(getCurrLng);
  const currentId = useSelector(getCurrentId);

  function handleRate(e) {
    setRateValue(+e.target.dataset.rate);
  }

  useEffect(() => {
    setRateValue(0)
  }, [place]);

  useEffect(() => {
    if (rateValue && username) {
      dispatch(setRate(rateValue, username, place));
    }
  }, [rateValue, username, place, currentId, currLng]);

  const inputs = RATES.map((rate) => (
    <React.Fragment key={rate.rate}>
      <input
        className="rate__input"
        id={`rate-${rate.rate}`}
        type="radio"
        onChange={handleRate}
        data-rate={rate.rate}
        checked={rateValue ? (rateValue >= rate.rate ? true : rate.checked) : rate.checked}
        key={rate.rate}
      />
      <label htmlFor={`rate-${rate.rate}`} />
    </React.Fragment>
  ));

  return (
    <div className="rate__select">
      {inputs}
    </div>
  )
}

RateSelect.propTypes = {
	place: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    rates: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        rate: PropTypes.number,
      })
    ),
  }).isRequired,
};

export default RateSelect;
