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
import { formatDate } from '../../utils';

export interface BlogPreviewProps {
	blogToPreview: {
		authorName: string;
		content: { raw: string };
		publishDate: string;
		slug: string;
		title: string;
	};
	headerText?: string;
}

export function BlogPreview({ blogToPreview, headerText }: BlogPreviewProps) {
	const { authorName, content, publishDate, slug, title } = blogToPreview;

	return (
		<div className={styles.blogPreviewContainer}>
			{headerText && <h2>{headerText}</h2>}
			<div className={styles.blogPreview}>
				<p>Published {formatDate(publishDate)}</p>
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
