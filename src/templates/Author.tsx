// external
import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link, PageProps, graphql } from 'gatsby';

// components
import { Layout, SEO } from '../components';

// utils
import { formatDate } from '../utils';

// styles
import * as styles from './Author.module.css';

export function Author({ data }: PageProps<Queries.AuthorsQuery>) {
	const {
		allContentfulBlogPost: { nodes: blogPosts },
		contentfulAuthor,
	} = data;

	const authorImage = contentfulAuthor?.photo.gatsbyImageData
		? getImage(contentfulAuthor.photo.gatsbyImageData)
		: undefined;
	return (
		<Layout>
			<h2>Get to know {contentfulAuthor?.name}</h2>
			<div className={styles.avatarAndBioContainer}>
				{authorImage && (
					<GatsbyImage
						className={styles.authorPhoto}
						image={authorImage}
						alt='Author Photo'
					/>
				)}
				<p className={styles.bioContent}>{contentfulAuthor?.bio?.bio}</p>
			</div>
			{blogPosts.length ? (
				<div>
					<h2>Author's Posts</h2>
					<ul>
						{blogPosts.map((post) => {
							const { createdAt, id, slug, title } = post;
							return (
								<li key={id}>
									<Link to={`/blog/${slug}`}>{title}</Link>
									{createdAt !== null && (
										<span> - {formatDate(createdAt)}</span>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			) : null}
		</Layout>
	);
}

export default Author;

export const Head = ({ data }: PageProps<Queries.AuthorsQuery>) => {
	const { contentfulAuthor } = data;
	return <SEO title={`CYBERMOMS - ${contentfulAuthor?.name}'s Author Page`} />;
};

export const query = graphql`
	query Authors($slug: String!) {
		contentfulAuthor(slug: { eq: $slug }) {
			photo {
				gatsbyImageData(width: 200)
			}
			bio {
				bio
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
