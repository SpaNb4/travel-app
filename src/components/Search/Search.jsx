import * as React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import './Search.scss';

const EMPTY_LINE = /^$/;
const WITHOUT_SPACES = /\S/;

import { updateSearchValue } from '../../store/countries/actions';
import { useTranslation } from 'react-i18next';

const Search = () => {
	const dispatch = useDispatch();
	// const pathname = window.location.pathname;
  const { pathname } = useLocation();
	const [path, setPath] = useState(pathname);
	const [searchValue, setSearchValue] = useState('');
	const [valid, setValid] = useState();
	const [t] = useTranslation();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      if (valid) {
        dispatch(updateSearchValue(searchValue))
      }
    },
    [valid, searchValue]
  )

  const handleChange = useCallback(
    (event) => {
      const { value } = event.target
      setSearchValue(value)
      if (WITHOUT_SPACES.exec(value) && !EMPTY_LINE.exec(value)) {
        setValid(true)
        dispatch(updateSearchValue(value))
      }
    })

  const handleClear = useCallback(
    () => {
      setSearchValue('')
      dispatch(updateSearchValue(''))
    })
  
  useEffect(() => {
    setPath(pathname)
  }, [pathname]);

	const show = path === '/';
  
  return (
    <React.Fragment>
      { 
        show && (
          <Paper
            component="form"
            className="form"
          >
            <TextField
              type="text"
              autoFocus={true}
              autoComplete="off"
              placeholder={t('Search country')}
              name="searchValue"
              onChange={handleChange}
              value={searchValue}
              className="form__input"
            />
            <IconButton
              onClick={handleClear}
            >
              <ClearIcon />
            </IconButton>
            <IconButton
              type="submit"
              onClick={handleSubmit}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        )
      }
    </React.Fragment>
  )
}

export default Search;
