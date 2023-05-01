import React, { PropsWithChildren } from 'react';

import * as styles from './Blockquote.module.css';

export function Blockquote({ children }: PropsWithChildren) {
	return (
		<div className={styles.blockQuoteContainer}>
			<blockquote className={styles.blockQuote}>{children}</blockquote>
		</div>
	);
}

export default Blockquote;
