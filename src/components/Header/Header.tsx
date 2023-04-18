import React from 'react';
import { VscListTree } from 'react-icons/vsc';
import { FaEnvelope, FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { Link } from 'gatsby';

import * as styles from './Header.module.css';
import ContactLink from '../ContactLink/ContactLink';

export function Header() {
	return (
		<header className={styles.header}>
			<Link className={styles.homeLink} to='/'>
				<VscListTree className={styles.bigIcon} />
			</Link>
			<div className={styles.headerTextAndIconContainer}>
				<h1 className={styles.headerText}>CYBERMOMS</h1>
				<h2 className={styles.subHeaderText}>Cyber Parenting Made Easy</h2>
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
