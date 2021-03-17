import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import logo from './../../assets/images/logo_rs.png';
import './Footer.scss';

const useStyles = makeStyles(() => ({
	item: {
		justifyContent: 'center',
		maxWidth: 100,
	},
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className="footer">
			<Container className={classes.container}>
				<div className="footer__wrapper">
					<List className="footer__list">
						<ListItem disableGutters className={classes.item}>
							<Link
								href="https://github.com/AlesyaKuptsova"
								className="footer__link author"
								target="_blank"
								color="initial"
								underline="none"
							>
								<GitHubIcon className="footer__icon" />
								<span>Alesya</span>
							</Link>
						</ListItem>
						<ListItem disableGutters className={classes.item}>
							<Link
								href="https://github.com/magklax"
								className="footer__link author"
								target="_blank"
								color="initial"
								underline="none"
							>
								<GitHubIcon className="footer__icon" />
								<span>Nadia</span>
							</Link>
						</ListItem>
						<ListItem disableGutters className={classes.item}>
							<Link
								href="https://github.com/kovalenkoiryna15"
								className="footer__link author"
								target="_blank"
								color="initial"
								underline="none"
							>
								<GitHubIcon className="footer__icon" />
								<span>Iryna</span>
							</Link>
						</ListItem>
						<ListItem disableGutters className={classes.item}>
							<Link
								href="https://github.com/SpaNb4"
								className="footer__link author"
								target="_blank"
								color="initial"
								underline="none"
							>
								<GitHubIcon className="footer__icon" />
								<span>Dmitry</span>
							</Link>
						</ListItem>
					</List>
					<div className="footer__copyright">
						<p className="footer__date">&copy; {new Date().getFullYear()}</p>
						<Link href="https://rs.school/js/" className="footer__logo" target="_blank">
							<img
								src={logo}
								alt="rs school logo"
								width={100}
								height={50}
								className="rsschool-logo__img"
							/>
						</Link>
					</div>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
