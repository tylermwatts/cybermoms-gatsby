// external
import React, { PropsWithChildren } from 'react';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import {
	ContentfulRichTextGatsbyReference,
	RenderRichTextData,
	renderRichText,
} from 'gatsby-source-contentful/rich-text';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link, PageProps, graphql } from 'gatsby';

// components
import {
	Blockquote,
	CodeBlock,
	Hyperlink,
	ImageWithDescription,
	Layout,
	SEO,
	Table,
	TableCell,
	TableHeader,
	TableRow,
} from '../components';

// utils
import { formatDate } from '../utils';

// styles
import * as styles from './BlogPost.module.css';

export function BlogPost({
	data,
}: PropsWithChildren<PageProps<Queries.BlogPostQuery>>) {
	const { contentfulBlogPost } = data;
	const authorImage = getImage(
		contentfulBlogPost?.author.photo.gatsbyImageData || null
	);

	const richTextOutput = renderRichText(
		contentfulBlogPost?.content as unknown as RenderRichTextData<ContentfulRichTextGatsbyReference>,
		{
			renderMark: {
				[MARKS.CODE]: (text) => <CodeBlock>{text}</CodeBlock>,
			},
			renderNode: {
				[INLINES.HYPERLINK]: (node, children) => {
					const { uri } = node.data;
					return <Hyperlink uri={uri}>{children}</Hyperlink>;
				},
				[MARKS.BOLD]: (node, children) => (
					<strong style={{ fontWeight: 700 }}>{children}</strong>
				),
				[BLOCKS.EMBEDDED_ASSET]: (node) => {
					const { description, gatsbyImageData } = node.data.target;
					const image = getImage(gatsbyImageData);
					if (image) {
						return (
							<ImageWithDescription description={description} image={image} />
						);
					}
				},
				[BLOCKS.TABLE]: (node, children) => <Table>{children}</Table>,
				[BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
					<TableHeader>{children}</TableHeader>
				),
				[BLOCKS.TABLE_ROW]: (node, children) => <TableRow>{children}</TableRow>,
				[BLOCKS.TABLE_CELL]: (node, children) => (
					<TableCell>{children}</TableCell>
				),
				[BLOCKS.QUOTE]: (node, children) => <Blockquote>{children}</Blockquote>,
			},
		}
	);

	return (
		<Layout>
			<article className={styles.blogPostContainer}>
				<h2>{contentfulBlogPost?.title}</h2>
				{contentfulBlogPost?.createdAt && (
					<p className={styles.publishDate}>
						Published <time>{formatDate(contentfulBlogPost.createdAt)}</time>
					</p>
				)}
				{contentfulBlogPost?.content && (
					<article className={styles.blogContent}>{richTextOutput}</article>
				)}
				<section id='author-info' className={styles.authorInfo}>
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
				</section>
			</article>
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
				references {
					... on ContentfulAsset {
						contentful_id
						__typename
						gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
						title
						description
						file {
							url
						}
					}
				}
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
