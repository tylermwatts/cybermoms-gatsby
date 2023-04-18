import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from './Author.module.css';
import { Layout } from '../components';
import { formatDate } from '../utils';

export interface AuthorProps {
	data: {
		contentfulAuthor: {
			authorPhoto: {
				gatsbyImageData: any;
			};
			bio: {
				internal: {
					content: string;
				};
			};
			name: string;
		};
		allContentfulBlogPost: {
			nodes: Array<{
				createdAt: string;
				id: string;
				slug: string;
				title: string;
			}>;
		};
	};
}

export function Author({ data }: AuthorProps) {
	const {
		allContentfulBlogPost: { nodes: blogPosts },
		contentfulAuthor: {
			authorPhoto,
			bio: {
				internal: { content },
			},
			name,
		},
	} = data;
	const authorImage = getImage(authorPhoto.gatsbyImageData);
	return (
		<Layout>
			<h2>Get to know {name}</h2>
			<div className={styles.avatarAndBioContainer}>
				{authorImage && (
					<GatsbyImage
						className={styles.authorPhoto}
						image={authorImage}
						alt='Author Photo'
					/>
				)}
				<p className={styles.bioContent}>{content}</p>
			</div>
			<div>
				<h2>Author's Posts</h2>
				<ul>
					{blogPosts.map((post) => {
						const { createdAt, id, slug, title } = post;
						return (
							<li key={id}>
								<Link to={`/blog/${slug}`}>{title}</Link>
								<span> - {formatDate(createdAt)}</span>
							</li>
						);
					})}
				</ul>
			</div>
		</Layout>
	);
}

export default Author;

export const query = graphql`
	query ($slug: String!) {
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
