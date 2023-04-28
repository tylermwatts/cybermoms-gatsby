// external
import React from 'react';
import {
	ContentfulRichTextGatsbyReference,
	RenderRichTextData,
	renderRichText,
} from 'gatsby-source-contentful/rich-text';
import { Link } from 'gatsby';

// styles
import * as styles from './BlogPreview.module.css';

export interface BlogPreviewProps {
	blogToPreview: {
		authorName: string | null;
		content: { raw: string | null } | null;
		slug: string | null;
		title: string | null;
	};
	headerText?: string;
}

export function BlogPreview({ blogToPreview, headerText }: BlogPreviewProps) {
	const { authorName, content, slug, title } = blogToPreview;

	return (
		<div className={styles.blogPreviewContainer}>
			{headerText && <h2>{headerText}</h2>}
			<div className={styles.blogPreview}>
				<h3>{title}</h3>
				<div className={styles.previewOverlayContainer}>
					<div className={styles.blogContentPreview}>
						{renderRichText(
							content as RenderRichTextData<ContentfulRichTextGatsbyReference>
						)}
					</div>
					<div className={styles.absoluteOverlay} />
				</div>
			</div>
			<div className={styles.readMoreContainer}>
				<p className={styles.authorName}>By {authorName}</p>
				<Link to={`/blog/${slug}`}>Read more...</Link>
			</div>
		</div>
	);
}

export default BlogPreview;
