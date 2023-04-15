import * as React from 'react';
import { graphql } from 'gatsby';

export interface BlogPostTemplateProps {
	data: {
		markdownRemark: {
			html: string;
			frontmatter: {
				title: string;
			};
		};
	};
}

export function BlogPostTemplate({ data }: BlogPostTemplateProps) {
	const post = data.markdownRemark;
	return (
		<div>
			<h1>{post.frontmatter.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: post.html }} />
		</div>
	);
}

export default BlogPostTemplate;

export const pageQuery = graphql`
	query ($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				title
			}
		}
	}
`;
