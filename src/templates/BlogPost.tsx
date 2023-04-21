import * as styles from './BlogPost.module.css';
import React, { PropsWithChildren } from 'react';
import {
	ContentfulRichTextGatsbyReference,
	RenderRichTextData,
	renderRichText,
} from 'gatsby-source-contentful/rich-text';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { INLINES, MARKS } from '@contentful/rich-text-types';
import { Layout, SEO } from '../components';
import { Link, PageProps, graphql } from 'gatsby';
import { formatDate } from '../utils';

export function BlogPost({
	data,
}: PropsWithChildren<PageProps<Queries.BlogPostQuery>>) {
	const { contentfulBlogPost } = data;
	const authorImage = getImage(
		contentfulBlogPost?.author.photo.gatsbyImageData || null
	);
	return (
		<Layout>
			<div>
				<h2>{contentfulBlogPost?.title}</h2>
				{contentfulBlogPost?.createdAt && (
					<p className={styles.publishDate}>
						Published {formatDate(contentfulBlogPost.createdAt)}
					</p>
				)}
			</div>
			{contentfulBlogPost?.content && (
				<div className={styles.blogContent}>
					{renderRichText(
						contentfulBlogPost.content as RenderRichTextData<ContentfulRichTextGatsbyReference>,
						{
							renderMark: {
								[MARKS.CODE]: (text) => {
									return (
										<div className={styles.codeBlock}>
											<code>{text}</code>
										</div>
									);
								},
							},
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
							},
						}
					)}
				</div>
			)}
			<div className={styles.authorInfo}>
				{authorImage && (
					<GatsbyImage
						className={styles.authorPhoto}
						image={authorImage}
						alt='Author Photo'
					/>
				)}
				<div className={styles.authorLinkContainer}>
					<p>Written by </p>
					<Link
						to={`/author/${contentfulBlogPost?.author?.slug}`}
						className={styles.authorLink}
					>
						{contentfulBlogPost?.author?.name}
					</Link>
				</div>
			</div>
		</Layout>
	);
}

export default BlogPost;

export const Head = ({ data }: PageProps<Queries.BlogPostQuery>) => (
	<SEO title={`CYBERMOMS - ${data.contentfulBlogPost?.title}`} />
);

export const query = graphql`
	query BlogPost($slug: String!) {
		contentfulBlogPost(slug: { eq: $slug }) {
			title
			content {
				raw
			}
			createdAt
			updatedAt
			author {
				name
				photo {
					gatsbyImageData(width: 100)
				}
				slug
			}
		}
	}
`;
