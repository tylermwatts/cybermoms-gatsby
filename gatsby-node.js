exports.createPages = async function ({ actions, graphql }) {
	const { data } = await graphql(`
		query {
			allContentfulBlogPost {
				nodes {
					slug
				}
			}
			allContentfulAuthor {
				nodes {
					slug
				}
			}
		}
	`);

	data.allContentfulBlogPost.nodes.forEach((node) => {
		const { slug } = node;
		actions.createPage({
			path: `/blog/${slug}`,
			component: require.resolve(`./src/templates/BlogPost.tsx`),
			context: { slug },
		});
	});

	data.allContentfulAuthor.nodes.forEach((node) => {
		const { slug } = node;
		actions.createPage({
			path: `/author/${slug}`,
			component: require.resolve(`./src/templates/Author.tsx`),
			context: { slug },
		});
	});
};
