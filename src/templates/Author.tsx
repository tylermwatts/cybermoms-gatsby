import React from 'react';
import { Link, PageProps, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from './Author.module.css';
import { Layout } from '../components';
import { formatDate } from '../utils';

export function Author({ data }: PageProps<Queries.AuthorsQuery>) {
	const {
		allContentfulBlogPost: { nodes: blogPosts },
		contentfulAuthor,
	} = data;

	const authorImage = contentfulAuthor!.authorPhoto?.gatsbyImageData
		? getImage(contentfulAuthor!.authorPhoto.gatsbyImageData)
		: undefined;
	return (
		<Layout>
			<h2>Get to know {contentfulAuthor!.name}</h2>
			<div className={styles.avatarAndBioContainer}>
				{authorImage && (
					<GatsbyImage
						className={styles.authorPhoto}
						image={authorImage}
						alt='Author Photo'
					/>
				)}
				<p className={styles.bioContent}>
					{contentfulAuthor!.bio?.internal.content}
				</p>
			</div>
			<div>
				<h2>Author's Posts</h2>
				<ul>
					{blogPosts.map((post) => {
						const { createdAt, id, slug, title } = post;
						return (
							<li key={id}>
								<Link to={`/blog/${slug}`}>{title}</Link>
								{createdAt !== null && <span> - {formatDate(createdAt)}</span>}
							</li>
						);
					})}
				</ul>
			</div>
		</Layout>
	);
}

export default Author;

export const Head = ({ data }: PageProps<Queries.AuthorsQuery>) => {
	const { contentfulAuthor } = data;
	return <title>CYBERMOMS - {contentfulAuthor!.name}'s Author Page</title>;
};

export const query = graphql`
	query Authors($slug: String!) {
		contentfulAuthor(slug: { eq: $slug }) {
			authorPhoto {
				gatsbyImageData(width: 200)
			}
			bio {
				internal {
					content
				}
			}
			name
		}
		allContentfulBlogPost(
			filter: { author: { slug: { eq: $slug } } }
			sort: [{ createdAt: DESC }]
		) {
			nodes {
				createdAt
				id
				slug
				title
			}
		}
	}
`;
