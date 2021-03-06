import * as React from 'react'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Paper, IconButton, TextField } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import './Search.scss'

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

const Search = (props) => {
  const classes = useStyles()
  const pathname = window.location.pathname
  const [path, setPath] = useState(pathname);
  
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
              onChange={props.handleChange}
              value={props.searchValue}
              className={classes.input}
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton
              type="submit"
              onSubmit={props.handleChange}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        )
      }
    </React.Fragment>
  )
}

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
}

export default Search
