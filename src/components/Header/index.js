import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import LanguageIcon from '@material-ui/icons/Language';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExchangeRates from '../Widgets/ExchangeRates/ExchangeRates';
import Timer from '../Widgets/Timer/Timer';

import Search from '../Search';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	logoButton: {
		marginRight: theme.spacing(2),
	}
}));

const Header = () => {
	const classes = useStyles();
	const auth = true;

	return (
		<AppBar position="static">
			<Container>
				<Toolbar>
					<Link href="#" color="inherit">
						<TagFacesIcon />
					</Link>

					<Search />

					<div className={classes.grow} />

					<IconButton aria-label="display language select" color="inherit">
						<LanguageIcon />
					</IconButton>

					{auth && (
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							color="inherit"
						>
							<AccountCircleIcon />
						</IconButton>
					)}
				</Toolbar>
				<ExchangeRates currency={'EUR'} />
				<Timer timeZone={'Europe/Kiev'} lang={'ru-RU'} />
			</Container>
		</AppBar>
	);
};

export default Header;
