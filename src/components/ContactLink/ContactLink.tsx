import React, { PropsWithChildren } from 'react';
import { Link } from 'gatsby';

import * as styles from './ContactLink.module.css';

export interface ContactIconProps {
	/**
	 * The external URL you want to link to
	 */
	href: string;
}

export function ContactIcon({
	children,
	href: to,
}: PropsWithChildren<ContactIconProps>) {
	return (
		<a href={to} target='_blank' className={styles.contactLink}>
			{children}
		</a>
	);
}

export default ContactIcon;
