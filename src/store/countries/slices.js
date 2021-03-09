import { useSelector } from 'react-redux';

const countriesSlices = {
	countries: () => useSelector(({ countries: { countries } }) => countries),
	loading: () => useSelector(({ countries: { loading } }) => loading),
	currentId: () => useSelector(({ countries: { currentId } }) => currentId),
};

export default countriesSlices;
