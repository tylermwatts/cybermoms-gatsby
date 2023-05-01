import React, { PropsWithChildren } from 'react';

export interface HyperlinkProps {
	uri: string;
}

export function Hyperlink({
	children,
	uri,
}: PropsWithChildren<HyperlinkProps>) {
	return (
		<a href={uri} target='_blank'>
			{children}
		</a>
	);
}

export default Hyperlink;
