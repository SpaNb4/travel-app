import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CountryGrid from '../../components/CountryGrid';
import { getCountryId } from '../../store/country/actions';

const Country = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getCountryId(id));
	}, [id]);

	return <CountryGrid />;
};

export default Country;
