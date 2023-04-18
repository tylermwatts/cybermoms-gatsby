import React from 'react';
import { Layout } from '../../components';
import { Link, graphql } from 'gatsby';
import { formatDate } from '../../utils';

export interface BlogIndexProps {
	data: {
		allContentfulBlogPost: {
			nodes: Array<{
				author: {
					name: string;
				};
				createdAt: string;
				id: string;
				slug: string;
				title: string;
			}>;
		};
	};
}

export function BlogIndex({ data }: BlogIndexProps) {
	const {
		allContentfulBlogPost: { nodes },
	} = data;
	return (
		<Layout>
			<h2>All blog posts</h2>
			<p>Sorted newest to oldest</p>
			<ul>
				{nodes.map((node) => {
					const {
						author: { name: authorName },
						createdAt,
						id,
						slug,
						title,
					} = node;
					return (
						<li key={id}>
							<Link to={`/blog/${slug}`}>{title}</Link>
							<span>
								{' '}
								- {formatDate(createdAt)} - by {authorName}
							</span>
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default BlogIndex;

export const pageQuery = graphql`
	query {
		allContentfulBlogPost(sort: [{ createdAt: DESC }]) {
			nodes {
				author {
					name
				}
				createdAt
				id
				slug
				title
			}
		}
	}
`;

export const Head = () => {
	return <title>CYBERMOMS - Blog Entries</title>;
};
