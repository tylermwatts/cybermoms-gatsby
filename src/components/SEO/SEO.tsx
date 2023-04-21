// external
import React, { PropsWithChildren } from 'react';

// hooks
import { useSiteMetadata } from '../../hooks';

export interface SEOProps {
	description?: string;
	pathname?: string;
	title?: string;
}

export const SEO = ({
	title,
	description,
	pathname,
	children,
}: PropsWithChildren<SEOProps>) => {
	const {
		title: defaultTitle,
		description: defaultDescription,
		siteUrl,
		// twitterUsername,
	} = useSiteMetadata();

	const seo = {
		description: description || defaultDescription,
		title: title || defaultTitle,
		url: `${siteUrl}${pathname || ``}`,
		// twitterUsername,
	};

	return (
		<>
			<html lang='en' />
			<title>{seo.title}</title>
			<meta name='description' content={seo.description} />
			{/* <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>" /> */}
			{children}
		</>
	);
};
