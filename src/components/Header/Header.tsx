// external
import React from 'react';
import { FaEnvelope, FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { Link } from 'gatsby';

// components
import ContactLink from '../ContactLink/ContactLink';

// assets
import CybermomsLogo from '../../assets/cybermomslogo_bw.svg';

// styles
import * as styles from './Header.module.css';

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.mainHeaderSection}>
				<CybermomsLogo className={styles.cybermomsLogo} />
				<div className={styles.headerTextAndIconContainer}>
					<h1 className={styles.headerText}>CYBERMOMS</h1>
					<h2 className={styles.subHeaderText}>Cyber Parenting Made Easy</h2>
					<div className={styles.contactIconContainer}>
						<ContactLink
							href={'http://instagram.com/cybermoms'}
							name='Instagram Link'
						>
							<FaInstagram className={styles.contactIcon} />
						</ContactLink>
						<ContactLink
							href={'http://facebook.com/cybermoms'}
							name='Facebook Link'
						>
							<FaFacebookSquare className={styles.contactIcon} />
						</ContactLink>
						<ContactLink href={'mailto:admin@cybermoms.io'} name='Email Link'>
							<FaEnvelope className={styles.contactIcon} />
						</ContactLink>
					</div>
				</div>
			</div>
			<nav className={styles.siteNavContainer}>
				<Link className={styles.siteNavLink} to='/'>
					Home
				</Link>
				<Link className={styles.siteNavLink} to='/blog'>
					Blog Posts
				</Link>
				<Link className={styles.siteNavLink} to='/author'>
					Authors
				</Link>
			</nav>
		</header>
	);
}

export default Header;
