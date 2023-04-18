import React, { PropsWithChildren } from 'react';
import * as styles from './Layout.module.css';
import Header from '../Header/Header';

export function Layout({ children }: PropsWithChildren) {
	return (
		<div>
			<Header />
			<div className={styles.childContainer}>{children}</div>
		</div>
	);
}

export default Layout;
