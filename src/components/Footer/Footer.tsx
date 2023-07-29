// external
import React from 'react';

// styles
import * as styles from './Footer.module.css';
import SingleInputForm from '../SingleInputForm/SingleInputForm';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p>© 2023 Cybermoms</p>
			{/* This input form obviously does nothing as of right now but eventually we will connect it to a mailing list aggregator */}
			<SingleInputForm
				labelText='Subscribe to our mailing list!'
				onSubmit={(data) => console.log({ data })}
				inputType='email'
			/>
		</footer>
	);
}

export default Footer;
