// external
import React, { PropsWithChildren } from 'react';

// components
import Header from '../Header/Header';

// styles
import * as styles from './Layout.module.css';

export function Layout({ children }: PropsWithChildren) {
	return (
		<div>
			<Header />
			<div className={styles.childContainer}>{children}</div>
		</div>
	);
}

export default Layout;
