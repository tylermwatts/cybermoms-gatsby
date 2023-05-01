import React, { PropsWithChildren } from 'react';

import * as styles from './CodeBlock.module.css';

export function CodeBlock({ children }: PropsWithChildren) {
	return (
		<div className={styles.codeBlock}>
			<code>{children}</code>
		</div>
	);
}

export default CodeBlock;
