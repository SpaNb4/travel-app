import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(() => ({
	flexContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 0,
	},
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<AppBar position="static" color="primary">
			<Container>
				<Toolbar>
					<List className={classes.flexContainer}>
						<ListItem>
							<Link href="#" color="inherit">
								<GitHubIcon />
							</Link>
						</ListItem>
						<ListItem>
							<Link href="#" color="inherit">
								<GitHubIcon />
							</Link>
						</ListItem>
						<ListItem>
							<Link href="#" color="inherit">
								<GitHubIcon />
							</Link>
						</ListItem>
						<ListItem>
							<Link href="#" color="inherit">
								<GitHubIcon />
							</Link>
						</ListItem>
					</List>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Footer;
