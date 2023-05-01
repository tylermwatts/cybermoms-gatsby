import React, { PropsWithChildren } from 'react';

import * as styles from './Table.module.css';

export function Table({ children }: PropsWithChildren) {
	return (
		<table className={styles.table}>
			<tbody>{children}</tbody>
		</table>
	);
}

export function TableHeader({ children }: PropsWithChildren) {
	return <th className={styles.tableHeader}>{children}</th>;
}

export function TableRow({ children }: PropsWithChildren) {
	return <tr className={styles.tableRow}>{children}</tr>;
}

export function TableCell({ children }: PropsWithChildren) {
	return <td className={styles.tableCell}>{children}</td>;
}
