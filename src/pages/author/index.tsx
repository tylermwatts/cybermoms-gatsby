import React from 'react';
import { graphql, Link } from 'gatsby';
import { Layout } from '../../components';

export interface AuthorIndexProps {
	data: {
		allContentfulAuthor: {
			nodes: Array<{
				authorPhoto: {
					gatsbyImageData: any;
				};
				id: string;
				name: string;
				slug: string;
			}>;
		};
	};
}

export function AuthorIndex({ data }: AuthorIndexProps) {
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

export const pageQuery = graphql`
	query {
		allContentfulAuthor {
			nodes {
				authorPhoto {
					gatsbyImageData(width: 100)
				}
				name
				slug
			}
		}
	}
`;

export const Head = () => {
	return <title>CYBERMOMS - Blog Authors</title>;
};
