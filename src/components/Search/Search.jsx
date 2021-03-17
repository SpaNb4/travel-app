import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import './Search.scss';
import { updateSearchValue } from '../../store/countries/actions';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';

const Search = ({ searchValue, setSearchValue }) => {
	const dispatch = useDispatch();

	const [valid, setValid] = useState();
	const [t] = useTranslation();

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();
			event.stopPropagation();
			if (valid) {
				dispatch(updateSearchValue(searchValue));
			}
		},
		[valid, searchValue]
	);

	const handleChange = useCallback((event) => {
		const { value } = event.target;
		setSearchValue(value);
		setValid(true);
		dispatch(updateSearchValue(value));
	});

	const handleClear = useCallback(() => {
		setSearchValue('');
		dispatch(updateSearchValue(''));
	});

	return (
		<Paper component="form" className="form">
			<InputBase
				type="text"
				autoFocus={true}
				autoComplete="off"
				placeholder={t('Search country')}
				name="searchValue"
				onChange={handleChange}
				value={searchValue}
			/>

			<IconButton onClick={handleClear}>
				<ClearIcon />
			</IconButton>

			<IconButton type="submit" onClick={handleSubmit}>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

export default Search;

Search.propTypes = {
	searchValue: PropTypes.string.isRequired,
	setSearchValue: PropTypes.func.isRequired,
};
