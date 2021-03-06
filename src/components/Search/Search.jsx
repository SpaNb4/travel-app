import * as React from 'react'
import PropTypes from 'prop-types'
import { Paper, IconButton, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import './Search.scss'

const Search = (props) => (
  <Paper
    component='form'
    className='search-form'
  >
    <TextField
      className="input-search"
      type="search"
      autoFocus={true}
      autoComplete='off'
      placeholder='Search country'
      name="searchValue"
      onChange={props.handleChange}
      value={props.searchValue}
    />
    <IconButton
      type="submit"
      onSubmit={props.handleChange}
    >
      <SearchIcon />
    </IconButton>
  </Paper>
)

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
}

export default Search
