import React, { PropsWithChildren } from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import {
	ContentfulRichTextGatsbyReference,
	renderRichText,
	RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import { INLINES, MARKS } from '@contentful/rich-text-types';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import * as styles from './BlogPost.module.css';
import { Layout, SEO } from '../components';
import { formatDate } from '../utils';

export function BlogPost({
	data,
}: PropsWithChildren<PageProps<Queries.BlogPostQuery>>) {
	const { contentfulBlogPost } = data;
	const hasAuthorPhoto = Boolean(
		contentfulBlogPost &&
			contentfulBlogPost.author &&
			contentfulBlogPost.author.authorPhoto
	);
	const authorImage = hasAuthorPhoto
		? getImage(contentfulBlogPost!.author!.authorPhoto!.gatsbyImageData)
		: undefined;
	return (
		<Layout>
			<div>
				<h2>{contentfulBlogPost!.title}</h2>
				{contentfulBlogPost!.createdAt && (
					<p className={styles.publishDate}>
						Published {formatDate(contentfulBlogPost!.createdAt)}
					</p>
				)}
			</div>
			{contentfulBlogPost!.content !== null && (
				<div className={styles.blogContent}>
					{renderRichText(
						contentfulBlogPost!
							.content as RenderRichTextData<ContentfulRichTextGatsbyReference>,
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
						to={`/author/${contentfulBlogPost!.author!.slug}`}
						className={styles.authorLink}
					>
						{contentfulBlogPost!.author!.name}
					</Link>
				</div>
			</div>
		</Layout>
	);
}

export default BlogPost;

export const Head = ({ data }: PageProps<Queries.BlogPostQuery>) => (
	<SEO title={`CYBERMOMS - ${data.contentfulBlogPost!.title}`} />
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
				authorPhoto {
					gatsbyImageData(width: 100)
				}
				slug
			}
		}
	}
`;
