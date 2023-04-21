// external
import React, { PropsWithChildren } from 'react';

// styles
import * as styles from './ContactLink.module.css';

export interface ContactIconProps {
	/**
	 * The external URL you want to link to
	 */
	href: string;
	name: string;
}

export function ContactIcon({
	children,
	href: to,
	name,
}: PropsWithChildren<ContactIconProps>) {
	return (
		<a
			href={to}
			target='_blank'
			className={styles.contactLink}
			aria-label={name}
		>
			{children}
		</a>
	);
}

export default ContactIcon;
