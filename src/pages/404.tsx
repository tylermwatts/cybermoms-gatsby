// exteranl
import React from 'react';
import { HeadFC, Link, PageProps } from 'gatsby';

// components
import { Layout } from '../components';

const NotFoundPage: React.FC<PageProps> = () => {
	return (
		<Layout>
			<p>
				Oh no! The page you're attempting to access does not exist (anymore).
			</p>
			<Link to='/'>Click here to return home</Link>
		</Layout>
	);
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
