import * as React from 'react';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RateSelect.scss';

import { getUsername, getCurrLng } from '../../../../store/app/slices';
import { setRate } from '../../../../store/app/actions';
import { fetchCountries } from '../../../../store/countries/actions';

const RateSelect = ({ place }) => {
  const dispatch = useDispatch();
  const [rate, setRateValue] = useState(0);
  const username = useSelector(getUsername);
  const currLng = useSelector(getCurrLng);

  function handleRate(e) {
    setRateValue(+e.target.dataset.rate);
  }

  useEffect(() => {
    if (rate && username) {
      dispatch(setRate(rate, username, place));
      dispatch(fetchCountries(currLng));
    }
  }, [rate, username, place, currLng]);

  return (
    <div className="rate__select">
      <input className="rate__input" id="rate-5" type="radio" onChange={handleRate} data-rate="5" />
      <label htmlFor="rate-5" />
      <input className="rate__input" id="rate-4" type="radio" onChange={handleRate} data-rate="4" />
      <label htmlFor="rate-4" />
      <input className="rate__input" id="rate-3" type="radio" onChange={handleRate} data-rate="3" />
      <label htmlFor="rate-3" />
      <input className="rate__input" id="rate-2" type="radio" onChange={handleRate} data-rate="2" />
      <label htmlFor="rate-2" />
      <input className="rate__input" id="rate-1" type="radio" onChange={handleRate} data-rate="1" />
      <label htmlFor="rate-1" />
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
