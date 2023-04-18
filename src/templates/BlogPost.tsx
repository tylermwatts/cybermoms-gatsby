import React, { PropsWithChildren } from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, MARKS } from '@contentful/rich-text-types';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import * as styles from './BlogPost.module.css';
import { Layout } from '../components';
import { formatDate } from '../utils';

export function BlogPost({ data }: PropsWithChildren<PageProps<any>>) {
	const authorImage = getImage(
		data.contentfulBlogPost.author.authorPhoto.gatsbyImageData
	);
	return (
		<Layout>
			<div>
				<h2>{data.contentfulBlogPost.title}</h2>
				<p className={styles.publishDate}>
					Published {formatDate(data.contentfulBlogPost.createdAt)}
				</p>
			</div>
			<div className={styles.blogContent}>
				{renderRichText(data.contentfulBlogPost.content, {
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
				})}
			</div>
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
						to={`/author/${data.contentfulBlogPost.author.slug}`}
						className={styles.authorLink}
					>
						{data.contentfulBlogPost.author.name}
					</Link>
				</div>
			</div>
		</Layout>
	);
}

export default BlogPost;

export const query = graphql`
	query ($slug: String!) {
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

export const Head = ({ data }: { data: any }) => (
	<title>CYBERMOMS - {data.contentfulBlogPost.title}</title>
);
