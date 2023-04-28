// external
import React from 'react';
import { HeadFC, Link, PageProps, graphql } from 'gatsby';

// components
import { BlogPreview, Layout, SEO, StaticTextField } from '../components';

// global css
import './globals.css';

// styles
import * as styles from './index.module.css';

const IndexPage = (props: PageProps<Queries.IndexPageQuery>) => {
	const { allContentfulBlogPost, contentfulStaticTextField } = props.data;
	const { name, textBody } = contentfulStaticTextField || {
		name: '',
		textBody: { raw: '' },
	};

	const [latestBlog] = allContentfulBlogPost.nodes;

	return (
		<main>
			<Layout>
				<article id='about'>
					<StaticTextField body={textBody} name={name} />
				</article>
				<article id='latest blog'>
					<BlogPreview
						blogToPreview={{
							authorName: latestBlog.author.name,
							content: latestBlog.content,
							publishDate: latestBlog.createdAt,
							slug: latestBlog.slug,
							title: latestBlog.title,
						}}
						headerText='Latest Blog'
					/>
				</article>
				<div className={styles.blogLinkContainerStyles}>
					<Link to='/blog'>
						Click here to catch up on some of our other blog posts!
					</Link>
				</div>
			</Layout>
		</main>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />;

export const pageQuery = graphql`
	query IndexPage {
		allContentfulBlogPost(sort: [{ createdAt: DESC }], limit: 1) {
			nodes {
				author {
					name
				}
				id
				createdAt
				slug
				title
				content {
					raw
				}
			}
		}
		contentfulStaticTextField(
			id: { eq: "775bd2f4-394e-5cdf-93fd-9c0a28552edc" }
		) {
			name
			textBody {
				raw
			}
		}
	}
`;
