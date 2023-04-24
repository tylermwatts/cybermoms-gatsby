// external
import React from 'react';
import { Link, PageProps, graphql } from 'gatsby';

// components
import { Layout, SEO } from '../../components';

export function AuthorIndex({ data }: PageProps<Queries.AuthorIndexQuery>) {
	const {
		allContentfulAuthor: { nodes },
	} = data;

	return (
		<Layout>
			<h2>Get to know our authors</h2>
			<p>Sorted by most recent posts</p>
			<ul>
				{nodes.map((node) => {
					const { blog_post, id, name, slug } = node;
					return (
						<li key={id}>
							<Link to={`/author/${slug}`}>{name}</Link>
							{blog_post &&
								blog_post.length >= 0 &&
								` - ${blog_post.length} posts`}
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default AuthorIndex;

export const Head = () => {
	return <SEO title='CYBERMOMS - Authors' />;
};

export const pageQuery = graphql`
	query AuthorIndex {
		allContentfulAuthor(sort: { blog_post: { createdAt: DESC } }) {
			nodes {
				photo {
					gatsbyImageData(width: 100)
				}
				id
				name
				slug
				blog_post {
					id
				}
			}
		}
	}
`;
