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
			<p>Get to know our authors!</p>
			<ul>
				{nodes.map((node) => {
					const { id, name, slug } = node;
					return (
						<li key={id}>
							<Link to={`/author/${slug}`}>{name}</Link>
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
		allContentfulAuthor {
			nodes {
				authorPhoto {
					gatsbyImageData(width: 100)
				}
				id
				name
				slug
			}
		}
	}
`;
