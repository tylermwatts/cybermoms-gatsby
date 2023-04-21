// external
import React from 'react';
import { Link, PageProps, graphql } from 'gatsby';

// components
import { Layout, SEO } from '../../components';

// utils
import { formatDate } from '../../utils';

export function BlogIndex({ data }: PageProps<Queries.BlogIndexQuery>) {
	const {
		allContentfulBlogPost: { nodes },
	} = data;
	return (
		<Layout>
			<h2>All blog posts</h2>
			<p>Sorted newest to oldest</p>
			<ul>
				{nodes.map((node) => {
					const { author, createdAt, id, slug, title } = node;
					return (
						<li key={id}>
							<Link to={`/blog/${slug}`}>{title}</Link>
							<span>
								{' '}
								- {formatDate(createdAt)} - by {author.name}
							</span>
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default BlogIndex;

export const Head = () => {
	return <SEO title='CYBERMOMS - Blog Entries' />;
};

export const pageQuery = graphql`
	query BlogIndex {
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
