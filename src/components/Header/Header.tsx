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
			<Link className={styles.homeLink} to='/'>
				<CybermomsLogo className={styles.bigIcon} />
			</Link>
			<div className={styles.headerTextAndIconContainer}>
				<Link className={styles.headerTextHomeLink} to='/'>
					<h1 className={styles.headerText}>CYBERMOMS</h1>
					<h2 className={styles.subHeaderText}>Cyber Parenting Made Easy</h2>
				</Link>
				<div className={styles.contactIconContainer}>
					<ContactLink href={'http://instagram.com'} name='Instagram Link'>
						<FaInstagram className={styles.contactIcon} />
					</ContactLink>
					<ContactLink href={'http://facebook.com'} name='Facebook Link'>
						<FaFacebookSquare className={styles.contactIcon} />
					</ContactLink>
					<ContactLink href={'mailto:admin@cybermoms.com'} name='Email Link'>
						<FaEnvelope className={styles.contactIcon} />
					</ContactLink>
				</div>
			</div>
		</header>
	);
}

export default Header;
