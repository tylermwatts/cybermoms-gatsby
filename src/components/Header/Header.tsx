import React from 'react';
import { VscListTree } from 'react-icons/vsc';
import { FaEnvelope, FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { Link } from 'gatsby';
import ContactLink from '../ContactLink/ContactLink';
import CybermomsLogo from '../../assets/cybermomslogo_bw.svg';

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
					<ContactLink href={'http://instagram.com'}>
						<FaInstagram className={styles.contactIcon} />
					</ContactLink>
					<ContactLink href={'http://facebook.com'}>
						<FaFacebookSquare className={styles.contactIcon} />
					</ContactLink>
					<ContactLink href={'mailto:admin@cybermoms.com'}>
						<FaEnvelope className={styles.contactIcon} />
					</ContactLink>
				</div>
			</div>
		</header>
	);
}

export default Header;
