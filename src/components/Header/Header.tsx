// external
import React from 'react';
import { FaEnvelope, FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

// components
import ContactLink from '../ContactLink/ContactLink';

// styles
import * as styles from './Header.module.css';

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.mainHeaderSection}>
				<div className={styles.navAndIconsContainer}>
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
					<div className={styles.contactIconContainer}>
						<ContactLink
							href={'https://instagram.com/cyber.moms'}
							name='Instagram Link'
						>
							<FaInstagram className={styles.contactIcon} />
						</ContactLink>
						<ContactLink
							href={'https://www.facebook.com/CyberMoms.io'}
							name='Facebook Link'
						>
							<FaFacebookSquare className={styles.contactIcon} />
						</ContactLink>
						<ContactLink href={'mailto:admin@cybermoms.io'} name='Email Link'>
							<FaEnvelope className={styles.contactIcon} />
						</ContactLink>
					</div>
				</div>
				<div className={styles.logoHeaderContainer}>
					<div className={styles.logoImageAndTextContainer}>
						<StaticImage
							layout='constrained'
							src='../../assets/CyberMomsLogo_white.png'
							alt='Cybermoms logo'
							style={{ maxWidth: 550 }}
						/>
						<h2 className={styles.subHeaderText}>Cyber Parenting Made Easy</h2>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
