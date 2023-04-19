import React from 'react';
import {
	ContentfulRichTextGatsbyReference,
	RenderRichTextData,
	renderRichText,
} from 'gatsby-source-contentful/rich-text';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

import * as styles from './StaticTextField.module.css';

export interface StaticTextFieldProps {
	name: string | null;
	body: {
		raw: string | null;
	} | null;
}

export function StaticTextField({ body, name }: StaticTextFieldProps) {
	return (
		<div className={styles.staticTextFieldContainer}>
			<h2>{name}</h2>
			<p>
				{renderRichText(
					body as RenderRichTextData<ContentfulRichTextGatsbyReference>,
					{
						renderNode: {
							[INLINES.HYPERLINK]: (node, children) => {
								const { uri } = node.data;
								return (
									<a href={uri} target='_blank'>
										{children}
									</a>
								);
							},
							[MARKS.BOLD]: (node, children) => (
								<p style={{ fontWeight: 700 }}>{children}</p>
							),
							[BLOCKS.PARAGRAPH]: (node, children) => {
								return <p className={styles.paragraph}>{children}</p>;
							},
						},
					}
				)}
			</p>
		</div>
	);
}

export default StaticTextField;
