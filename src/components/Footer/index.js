import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import logo from './../../assets/images/logo_rs.png';

const useStyles = makeStyles(() => ({
	flexContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	list: {
		display: 'flex',
		alignItems: 'center',
	},
	item: {
		width: 'auto',
		marginRight: 5,
	},
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<footer>
			<Container className={classes.flexContainer}>
				<List className={classes.list}>
					<ListItem className={classes.item}>© {new Date().getFullYear()}</ListItem>
					<ListItem className={classes.item}>
						<Link href="https://github.com/AlesyaKuptsova" color="inherit" target="_blank">
							<GitHubIcon />
						</Link>
					</ListItem>
					<ListItem className={classes.item}>
						<Link href="https://github.com/magklax" color="inherit" target="_blank">
							<GitHubIcon />
						</Link>
					</ListItem>
					<ListItem className={classes.item}>
						<Link href="https://github.com/kovalenkoiryna15" color="inherit" target="_blank">
							<GitHubIcon />
						</Link>
					</ListItem>
					<ListItem className={classes.item}>
						<Link href="https://github.com/SpaNb4" color="inherit" target="_blank">
							<GitHubIcon />
						</Link>
					</ListItem>
				</List>
				<Link href="https://rs.school/js/" color="inherit" target="_blank">
					<img src={logo} alt="rs school logo" width={100} height={50} />
				</Link>
			</Container>
		</footer>
	);
};

export default Footer;
