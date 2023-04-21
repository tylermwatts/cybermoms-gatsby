/* eslint-disable @typescript-eslint/no-var-requires */
import type { GatsbyConfig } from 'gatsby';

require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
});

const path = require('path');
// Get paths of Gatsby's required rules, which as of writing is located at:
// https://github.com/gatsbyjs/gatsby/tree/fbfe3f63dec23d279a27b54b4057dd611dce74bb/packages/
// gatsby/src/utils/eslint-rules
const gatsbyRequiredRules = path.join(
	process.cwd(),
	'node_modules',
	'gatsby',
	'dist',
	'utils',
	'eslint-rules'
);

const config: GatsbyConfig = {
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		'gatsby-plugin-image',
		'gatsby-transformer-remark',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			__key: 'images',
			options: {
				name: 'images',
				path: './src/images/',
			},
			resolve: 'gatsby-source-filesystem',
		},
		{
			__key: 'pages',
			options: {
				name: 'pages',
				path: './src/pages/',
			},
			resolve: 'gatsby-source-filesystem',
		},
		{
			options: {
				accessToken: process.env.CONTENT_DELIVERY_API_TOKEN,
				spaceId: process.env.CONTENTFUL_SPACE_ID,
			},
			resolve: 'gatsby-source-contentful',
		},
		{
			options: {
				enableListener: true,
				preconnect: [
					`https://fonts.googleapis.com`,
					`https://fonts.gstatic.com`,
				],
				web: [
					{
						file: `https://fonts.googleapis.com/css2?family=Mina:wght@400;700&display=swap`,
						name: `Mina`,
					},
					{
						file: `https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap`,
						name: `Orbitron`,
					},
				],
			},
			resolve: `gatsby-omni-font-loader`,
		},
		{
			options: {
				rule: {
					include: /assets/,
				},
			},
			resolve: 'gatsby-plugin-react-svg',
		},
		{
			options: {
				exclude: ['node_modules', 'bower_components', '.cache', 'public'],
				extensions: ['js', 'jsx', 'ts', 'tsx'],
				rulePaths: [gatsbyRequiredRules],
				stages: ['develop'],
			},
			resolve: 'gatsby-plugin-eslint',
		},
	],
	siteMetadata: {
		description: 'Family friendly cyber security',
		image: './src/images/icon.png',
		siteUrl: `https://www.yourdomain.tld`,
		title: `CYBERMOMS`,
	},
};

export default config;
