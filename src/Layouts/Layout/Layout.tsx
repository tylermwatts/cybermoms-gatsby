// external
import React, { PropsWithChildren } from 'react';

// components
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

// styles
import * as styles from './Layout.module.css';

export function Layout({ children }: PropsWithChildren) {
	return (
		<main>
			<Header />
			<section className={styles.childContainer}>{children}</section>
			<Footer />
		</main>
	);
}

export default Layout;
