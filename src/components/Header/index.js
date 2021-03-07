import React from 'react';
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
import './Header.scss';

import * as c from '../../common/constants';

import Search from '../Search';

const Header = () => {
	const auth = true;

	return (
		<AppBar position="static" className="header">
			<Container className="header__container">
				<Toolbar className="header__toolbar">
					<Link href="#" color="inherit">
						<TagFacesIcon />
					</Link>

					<Search />

					<div className="header__toolbar_aside">
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
					</div>
				</Toolbar>
				<ExchangeRates currency={c.DEFAULT_CURRENCY} />
				<Timer timeZone={c.DEFAULT_TIMEZONE} lang={c.DEFAULT_LANG} />
			</Container>
		</AppBar>
	);
};

export default React.memo(Header);
