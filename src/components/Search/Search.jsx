import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Paper, IconButton, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import './Search.scss'

import { updateSearchValue } from '../../store/countries/actions'
const EMPTY_LINE = /^$/

const Search = () => {
  const dispatch = useDispatch()
  const pathname = window.location.pathname
  const [path, setPath] = useState(pathname)
  const [searchValue, setSearchValue] = useState('')
  const [valid, setValid] = useState(false)

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      if (valid) {
        dispatch(updateSearchValue(searchValue.trim()))
      }
    },
    [valid]
  )

  const handleChange = useCallback(
    (event) => {
      const { value } = event.target
      setSearchValue(value)
      if (!EMPTY_LINE.exec(value)) {
        setValid(true)
      }
    })

  const handleClear = useCallback(
    () => {
      setSearchValue('')
      setValid(false)
      dispatch(updateSearchValue(searchValue))
    })
  
  useEffect(() => {
    setPath(pathname)
  }, [pathname])

  const show = path === '/'

  return (
    <React.Fragment>
      { 
        show && (
          <Paper
            component='form'
            className='form'
          >
            <TextField
              type="text"
              autoFocus={true}
              autoComplete='off'
              placeholder='Search country'
              name="searchValue"
              onChange={handleChange}
              value={searchValue}
              className='form__input'
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton
              type="button"
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

export default Search
