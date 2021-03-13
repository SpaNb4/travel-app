import * as React from 'react';
// import { useEffect, useState, useCallback } from 'react';
// import { useDispatch } from 'react-redux';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import './RateSelect.scss';

const RateSelect = () => {
  return (
    <div className="rating">
      <input type="radio" name="rating" id="rating-5"><StarBorderIcon /></input>
      <label htmlFor="rating-5" />
      <input type="radio" name="rating" id="rating-4"><StarBorderIcon /></input>
      <label htmlFor="rating-4" />
      <input type="radio" name="rating" id="rating-3"><StarBorderIcon /></input>
      <label htmlFor="rating-3" />
      <input type="radio" name="rating" id="rating-2"><StarBorderIcon /></input>
      <label htmlFor="rating-2" />
      <input type="radio" name="rating" id="rating-1"><StarBorderIcon /></input>
      <label htmlFor="rating-1" />
    </div>
  )
}

export default RateSelect;
