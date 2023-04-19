import * as React from 'react';
import { HeadFC, Link, PageProps, graphql } from 'gatsby';
import './globals.css';
import { BlogPreview, Layout, StaticTextField } from '../components';

const blogLinkContainerStyles = {
	padding: '2rem',
};

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
					<h2>Latest Blog</h2>
					<BlogPreview
						latestBlog={{
							authorName: latestBlog.author!.name,
							content: latestBlog.content,
							slug: latestBlog.slug,
							title: latestBlog.title,
						}}
					/>
				</article>
				<div style={blogLinkContainerStyles}>
					<Link to='/blog'>
						Click here to catch up on some of our other blog posts!
					</Link>
				</div>
			</Layout>
		</main>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <title>CYBERMOMS</title>;

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
