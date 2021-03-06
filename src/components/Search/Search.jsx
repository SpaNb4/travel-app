import * as React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Paper, IconButton, TextField } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import './Search.scss'

import { updateSearchValue } from '../../store/countries/actions'

const useStyles = makeStyles((theme) => ({
	search: {
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, .15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, .25),
		},
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	input: {
    color: 'inherit',
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

const Search = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const pathname = window.location.pathname
  const [path, setPath] = useState(pathname)
  const [searchValue, setSearchValue] = useState()
  const [valid, setValid] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (valid) {
      dispatch(updateSearchValue(searchValue))
    }
  }

  const handleChange = (event) => {
    const { value } = event.target
    if (/\S/.exec(value) && !/^$/.exec(value)) {
      setValid(true)
      setSearchValue(value)
    }
  }
  
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
            className={classes.search}
          >
            <TextField
              type="search"
              autoFocus={true}
              autoComplete='off'
              placeholder='Search country'
              name="searchValue"
              onChange={handleChange}
              value={searchValue}
              className={classes.input}
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton
              type="submit"
              onSubmit={handleSubmit}
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
