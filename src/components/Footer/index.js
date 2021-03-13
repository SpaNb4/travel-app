import React from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import logo from './../../assets/images/logo_rs.png';
import './Footer.scss';

const Footer = () => {
	return (
		<footer>
			<Container className="footer footer__container">
				<div className="footer__column">&copy; {new Date().getFullYear()}</div>
				<div className="footer__column">
					<List className="list footer__list">
						<ListItem className="list__item footer__list__item">
							<Link
								href="https://github.com/AlesyaKuptsova"
								className="footer__link author"
								target="_blank"
							>
								<div>Alesya</div>
								<GitHubIcon className="footer__link github" />
							</Link>
						</ListItem>
						<ListItem className="list__item footer__list__item">
							<Link href="https://github.com/magklax" className="footer__link author" target="_blank">
								<div>Nadia</div>
								<GitHubIcon className="footer__link github" />
							</Link>
						</ListItem>
						<ListItem className="list__item footer__list__item">
							<Link
								href="https://github.com/kovalenkoiryna15"
								className="footer__link author"
								target="_blank"
							>
								<div>Iryna</div>
								<GitHubIcon className="footer__link github" />
							</Link>
						</ListItem>
						<ListItem className="list__item footer__list__item">
							<Link href="https://github.com/SpaNb4" className="footer__link author" target="_blank">
								<div>Dmitry</div>
								<GitHubIcon className="footer__link github" />
							</Link>
						</ListItem>
					</List>
				</div>
				<div className="footer__column">
					<Link href="https://rs.school/js/" className="footer__link rsschool-logo" target="_blank">
						<img src={logo} alt="rs school logo" width={100} height={50} className="rsschool-logo__img" />
					</Link>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
