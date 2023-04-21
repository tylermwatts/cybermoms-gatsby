import { GatsbyNode } from 'gatsby';
import { resolve } from 'path';

export const createPages: GatsbyNode['createPages'] = async function ({
	actions,
	graphql,
}) {
	const {
		data,
	}: {
		data?: {
			allContentfulAuthor: {
				nodes: Array<Queries.ContentfulAuthor>;
			};
			allContentfulBlogPost: {
				nodes: Array<Queries.ContentfulBlogPost>;
			};
		};
	} = await graphql(`
		query CreatePages {
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

	data?.allContentfulBlogPost.nodes.forEach((node) => {
		const { slug } = node;
		actions.createPage({
			component: resolve(`./src/templates/BlogPost.tsx`),
			context: { slug },
			path: `/blog/${slug}`,
		});
	});

	data?.allContentfulAuthor.nodes.forEach((node) => {
		const { slug } = node;
		actions.createPage({
			component: resolve(`./src/templates/Author.tsx`),
			context: { slug },
			path: `/author/${slug}`,
		});
	});
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
	({ actions }) => {
		const { createTypes } = actions;
		const typeDefs = `
		type ContentfulBlogPost implements Node {
				slug: String!
				author: ContentfulAuthor!
				createdAt: Date!
				id: String!
				title: String!
		}

		type ContentfulAuthor implements Node {
				authorPhoto: ImageSharp!
				bio: RichTextField!
				slug: String!
				id: String!
				name: String!
		}

    type ImageSharp {
      gatsbyImageData(
        aspectRatio: Float
        avifOptions: AVIFOptions
        backgroundColor: String
        blurredOptions: BlurredOptions
        breakpoints: [Int]
        formats: [ImageFormat]
        height: Int
        jpgOptions: JPGOptions
        layout: ImageLayout = CONSTRAINED
        outputPixelDensities: [Float]
        placeholder: ImagePlaceholder
        pngOptions: PNGOptions
        quality: Int
        sizes: String
        tracedSVGOptions: Potrace
        transformOptions: TransformOptions
        webpOptions: WebPOptions
        width: Int
      ): GatsbyImageData!
    }

		type RichTextField {
			internal: RichTextFieldContent!
		}

		type RichTextFieldContent {
			content: String!
		}
	`;

		createTypes(typeDefs);
	};
