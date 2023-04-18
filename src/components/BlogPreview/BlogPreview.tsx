import React from 'react';
import {
	ContentfulRichTextGatsbyReference,
	RenderRichTextData,
	renderRichText,
} from 'gatsby-source-contentful/rich-text';

import * as styles from './BlogPreview.module.css';
import { Link } from 'gatsby';

export interface BlogPreviewProps {
	latestBlog: {
		authorName: string;
		content: RenderRichTextData<ContentfulRichTextGatsbyReference>;
		slug: string;
		title: string;
	};
}

export function BlogPreview({ latestBlog }: BlogPreviewProps) {
	const { authorName, content, slug, title } = latestBlog;

	return (
		<div className={styles.blogPreviewContainer}>
			<h3>{title}</h3>
			<div className={styles.previewOverlayContainer}>
				<div className={styles.absoluteOverlay} />
				<div className={styles.blogContentPreview}>
					{renderRichText(content)}
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
