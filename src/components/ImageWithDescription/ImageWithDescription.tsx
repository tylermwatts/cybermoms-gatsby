import React from 'react';
import classNames from 'classnames';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import * as styles from './ImageWithDescription.module.css';

export interface ImageWithDescriptionProps {
	description?: string;
	image: IGatsbyImageData;
}

export function ImageWithDescription({
	description,
	image,
}: ImageWithDescriptionProps) {
	return (
		<figure className={styles.embeddedImageContainer}>
			<GatsbyImage
				alt={description || 'Embedded image'}
				className={classNames(
					styles.embeddedImage,
					!description && styles.roundedBottom
				)}
				image={image}
			/>
			{description ? (
				<figcaption
					className={classNames(
						styles.embeddedImageDescription,
						styles.roundedBottom
					)}
				>
					{description}
				</figcaption>
			) : null}
		</figure>
	);
}

export default ImageWithDescription;
