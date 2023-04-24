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
		enum RemoteFileFit {
			COVER
			FILL
			OUTSIDE
			CONTAIN
		}
		
		enum RemoteFileFormat {
			AUTO
			JPG
			PNG
			WEBP
			AVIF
		}
		
		enum RemoteFileLayout {
			FIXED
			FULL_WIDTH
			CONSTRAINED
		}
		
		enum RemoteFilePlaceholder {
			DOMINANT_COLOR
			BLURRED
			TRACED_SVG
			NONE
		}
		
		enum RemoteFileCropFocus {
			CENTER
			TOP
			RIGHT
			BOTTOM
			LEFT
			ENTROPY
			EDGES
			FACES
		}
		
		type RemoteFileResize {
			width: Int
			height: Int
			src: String
		}
		
		"""Remote Interface"""
		interface RemoteFile {
			id: ID!
			mimeType: String!
			filename: String!
			filesize: Int
			width: Int
			height: Int
			publicUrl: String!
			resize(
				width: Int
				height: Int
				aspectRatio: Float
				fit: RemoteFileFit = COVER
		
				"""
				
				The image formats to generate. Valid values are AUTO (meaning the same
				format as the source image), JPG, PNG, WEBP and AVIF.
				The default value is [AUTO, WEBP, AVIF], and you should rarely need to
				change this. Take care if you specify JPG or PNG when you do
				not know the formats of the source images, as this could lead to unwanted
				results such as converting JPEGs to PNGs. Specifying
				both PNG and JPG is not supported and will be ignored.
				"""
				format: RemoteFileFormat = AUTO
				cropFocus: [RemoteFileCropFocus]
				quality: Int = 75
			): RemoteFileResize
		
			"""
			Data used in the <GatsbyImage /> component. See https://gatsby.dev/img for more info.
			"""
			gatsbyImage(
				"""
				
				The layout for the image.
				FIXED: A static image sized, that does not resize according to the screen width
				FULL_WIDTH: The image resizes to fit its container. Pass a "sizes" option if
				it isn't going to be the full width of the screen.
				CONSTRAINED: Resizes to fit its container, up to a maximum width, at which point it will remain fixed in size.
				
				"""
				layout: RemoteFileLayout = CONSTRAINED
		
				"""
				
				The display width of the generated image for layout = FIXED, and the display
				width of the largest image for layout = CONSTRAINED.
				The actual largest image resolution will be this value multiplied by the largest value in outputPixelDensities
				Ignored if layout = FLUID.
				
				"""
				width: Int
		
				"""
				
				If set, the height of the generated image. If omitted, it is calculated from
				the supplied width, matching the aspect ratio of the source image.
				"""
				height: Int
		
				"""
				
				Format of generated placeholder image, displayed while the main image loads.
				BLURRED: a blurred, low resolution image, encoded as a base64 data URI
				DOMINANT_COLOR: a solid color, calculated from the dominant color of the image (default).
				TRACED_SVG: deprecated. Will use DOMINANT_COLOR.
				NONE: no placeholder. Set the argument "backgroundColor" to use a fixed background color.
				"""
				placeholder: RemoteFilePlaceholder = DOMINANT_COLOR
		
				"""
				
				If set along with width or height, this will set the value of the other
				dimension to match the provided aspect ratio, cropping the image if needed.
				If neither width or height is provided, height will be set based on the intrinsic width of the source image.
				
				"""
				aspectRatio: Float
		
				"""
				
				The image formats to generate. Valid values are AUTO (meaning the same
				format as the source image), JPG, PNG, WEBP and AVIF.
				The default value is [AUTO, WEBP, AVIF], and you should rarely need to
				change this. Take care if you specify JPG or PNG when you do
				not know the formats of the source images, as this could lead to unwanted
				results such as converting JPEGs to PNGs. Specifying
				both PNG and JPG is not supported and will be ignored.
				
				"""
				formats: [RemoteFileFormat!] = [AUTO, WEBP, AVIF]
		
				"""
				
				A list of image pixel densities to generate for FIXED and CONSTRAINED
				images. You should rarely need to change this. It will never generate images
				larger than the source, and will always include a 1x image.
				Default is [ 1, 2 ] for fixed images, meaning 1x, 2x, and [0.25, 0.5, 1, 2]
				for fluid. In this case, an image with a fluid layout and width = 400 would
				generate images at 100, 200, 400 and 800px wide.
				
				"""
				outputPixelDensities: [Float] = [0.25, 0.5, 1, 2]
		
				"""
				
				Specifies the image widths to generate. You should rarely need to change
				this. For FIXED and CONSTRAINED images it is better to allow these to be
				determined automatically,
				based on the image size. For FULL_WIDTH images this can be used to override
				the default, which is [750, 1080, 1366, 1920].
				It will never generate any images larger than the source.
				
				"""
				breakpoints: [Int] = [750, 1080, 1366, 1920]
		
				"""
				
				The "sizes" property, passed to the img tag. This describes the display size of the image.
				This does not affect the generated images, but is used by the browser to
				decide which images to download. You can leave this blank for fixed images,
				or if the responsive image
				container will be the full width of the screen. In these cases we will generate an appropriate value.
				
				"""
				sizes: String
		
				"""
				Background color applied to the wrapper, or when "letterboxing" an image to another aspect ratio.
				"""
				backgroundColor: String
				fit: RemoteFileFit = COVER
				cropFocus: [RemoteFileCropFocus]
				quality: Int = 75
			): GatsbyImageData
		}
		
		type File implements Node @dontInfer {
			sourceInstanceName: String!
			absolutePath: String!
			relativePath: String!
			extension: String!
			size: Int!
			prettySize: String!
			modifiedTime: Date! @dateformat
			accessTime: Date! @dateformat
			changeTime: Date! @dateformat
			birthTime: Date! @dateformat
			root: String!
			dir: String!
			base: String!
			ext: String!
			name: String!
			relativeDirectory: String!
			dev: Int!
			mode: Int!
			nlink: Int!
			uid: Int!
			gid: Int!
			rdev: Int!
			ino: Float!
			atimeMs: Float!
			mtimeMs: Float!
			ctimeMs: Float!
			atime: Date! @dateformat
			mtime: Date! @dateformat
			ctime: Date! @dateformat
			birthtime: Date @deprecated(reason: "Use 'birthTime' instead")
			birthtimeMs: Float @deprecated(reason: "Use 'birthTime' instead")
			blksize: Int
			blocks: Int
		}
		
		type Directory implements Node @dontInfer {
			sourceInstanceName: String!
			absolutePath: String!
			relativePath: String!
			extension: String!
			size: Int!
			prettySize: String!
			modifiedTime: Date! @dateformat
			accessTime: Date! @dateformat
			changeTime: Date! @dateformat
			birthTime: Date! @dateformat
			root: String!
			dir: String!
			base: String!
			ext: String!
			name: String!
			relativeDirectory: String!
			dev: Int!
			mode: Int!
			nlink: Int!
			uid: Int!
			gid: Int!
			rdev: Int!
			ino: Float!
			atimeMs: Float!
			mtimeMs: Float!
			ctimeMs: Float!
			atime: Date! @dateformat
			mtime: Date! @dateformat
			ctime: Date! @dateformat
			birthtime: Date @deprecated(reason: "Use 'birthTime' instead")
			birthtimeMs: Float @deprecated(reason: "Use 'birthTime' instead")
		}
		
		type Site implements Node @derivedTypes @dontInfer {
			buildTime: Date @dateformat
			siteMetadata: SiteSiteMetadata
			port: Int
			host: String
			graphqlTypegen: SiteGraphqlTypegen
			polyfill: Boolean
			pathPrefix: String
			jsxRuntime: String
			trailingSlash: String
		}
		
		type SiteSiteMetadata {
			title: String
			description: String
			image: String
			siteUrl: String
		}
		
		type SiteGraphqlTypegen {
			typesOutputPath: String
			documentSearchPaths: [String]
			generateOnBuild: Boolean
		}
		
		type SiteFunction implements Node @dontInfer {
			functionRoute: String!
			pluginName: String!
			originalAbsoluteFilePath: String!
			originalRelativeFilePath: String!
			relativeCompiledFilePath: String!
			absoluteCompiledFilePath: String!
			matchPath: String
		}
		
		type SitePage implements Node @dontInfer {
			path: String!
			component: String!
			internalComponentName: String!
			componentChunkName: String!
			matchPath: String
			pageContext: JSON @proxy(from: "context", fromNode: false)
			pluginCreator: SitePlugin @link(by: "id", from: "pluginCreatorId")
		}
		
		type SitePlugin implements Node @dontInfer {
			resolve: String
			name: String
			version: String
			nodeAPIs: [String]
			browserAPIs: [String]
			ssrAPIs: [String]
			pluginFilepath: String
			pluginOptions: JSON
			packageJson: JSON
		}
		
		type SiteBuildMetadata implements Node @dontInfer {
			buildTime: Date @dateformat
		}
		
		enum GatsbyImageFormat {
			NO_CHANGE
			AUTO
			JPG
			PNG
			WEBP
			AVIF
		}
		
		enum GatsbyImageLayout {
			FIXED
			FULL_WIDTH
			CONSTRAINED
		}
		
		enum GatsbyImagePlaceholder {
			DOMINANT_COLOR
			TRACED_SVG
			BLURRED
			NONE
		}
		
		type MarkdownHeading {
			id: String
			value: String
			depth: Int
		}
		
		enum MarkdownHeadingLevels {
			h1
			h2
			h3
			h4
			h5
			h6
		}
		
		enum MarkdownExcerptFormats {
			PLAIN
			HTML
			MARKDOWN
		}
		
		type MarkdownWordCount {
			paragraphs: Int
			sentences: Int
			words: Int
		}
		
		type MarkdownRemark implements Node @childOf(mimeTypes: ["text/markdown", "text/x-markdown"], types: ["contentfulAuthorBioTextNode"]) @derivedTypes @dontInfer {
			frontmatter: MarkdownRemarkFrontmatter
			excerpt: String
			rawMarkdownBody: String
		}
		
		type MarkdownRemarkFrontmatter {
			title: String
		}
		
		enum ImageFormat {
			NO_CHANGE
			AUTO
			JPG
			PNG
			WEBP
			AVIF
		}
		
		enum ImageFit {
			COVER
			CONTAIN
			FILL
			INSIDE
			OUTSIDE
		}
		
		enum ImageLayout {
			FIXED
			FULL_WIDTH
			CONSTRAINED
		}
		
		enum ImageCropFocus {
			CENTER
			NORTH
			NORTHEAST
			EAST
			SOUTHEAST
			SOUTH
			SOUTHWEST
			WEST
			NORTHWEST
			ENTROPY
			ATTENTION
		}
		
		input DuotoneGradient {
			highlight: String!
			shadow: String!
			opacity: Int
		}
		
		enum PotraceTurnPolicy {
			TURNPOLICY_BLACK
			TURNPOLICY_WHITE
			TURNPOLICY_LEFT
			TURNPOLICY_RIGHT
			TURNPOLICY_MINORITY
			TURNPOLICY_MAJORITY
		}
		
		input Potrace {
			turnPolicy: PotraceTurnPolicy
			turdSize: Float
			alphaMax: Float
			optCurve: Boolean
			optTolerance: Float
			threshold: Int
			blackOnWhite: Boolean
			color: String
			background: String
		}
		
		type ImageSharpFixed {
			base64: String
			tracedSVG: String
			aspectRatio: Float
			width: Float!
			height: Float!
			src: String!
			srcSet: String!
			srcWebp: String
			srcSetWebp: String
			originalName: String
		}
		
		type ImageSharpFluid {
			base64: String
			tracedSVG: String
			aspectRatio: Float!
			src: String!
			srcSet: String!
			srcWebp: String
			srcSetWebp: String
			sizes: String!
			originalImg: String
			originalName: String
			presentationWidth: Int!
			presentationHeight: Int!
		}
		
		enum ImagePlaceholder {
			DOMINANT_COLOR
			TRACED_SVG
			BLURRED
			NONE
		}
		
		input BlurredOptions {
			"""Width of the generated low-res preview. Default is 20px"""
			width: Int
		
			"""
			Force the output format for the low-res preview. Default is to use the same
			format as the input. You should rarely need to change this
			"""
			toFormat: ImageFormat
		}
		
		input JPGOptions {
			quality: Int
			progressive: Boolean = true
		}
		
		input PNGOptions {
			quality: Int
			compressionSpeed: Int = 4
		}
		
		input WebPOptions {
			quality: Int
		}
		
		input AVIFOptions {
			quality: Int
			lossless: Boolean
			speed: Int
		}
		
		input TransformOptions {
			grayscale: Boolean
			duotone: DuotoneGradient
			rotate: Int
			trim: Float
			cropFocus: ImageCropFocus = ATTENTION
			fit: ImageFit = COVER
		}
		
		type ImageSharpOriginal {
			width: Float
			height: Float
			src: String
		}
		
		type ImageSharpResize {
			src: String
			tracedSVG: String
			width: Int
			height: Int
			aspectRatio: Float
			originalName: String
		}
		
		type ImageSharp implements Node @childOf(types: ["File"]) @dontInfer {
			fixed(width: Int, height: Int, base64Width: Int, jpegProgressive: Boolean = true, pngCompressionSpeed: Int = 4, grayscale: Boolean, duotone: DuotoneGradient, traceSVG: Potrace, quality: Int, jpegQuality: Int, pngQuality: Int, webpQuality: Int, toFormat: ImageFormat, toFormatBase64: ImageFormat, cropFocus: ImageCropFocus = ATTENTION, fit: ImageFit = COVER, background: String = "rgba(0,0,0,1)", rotate: Int, trim: Float): ImageSharpFixed
			fluid(
				maxWidth: Int
				maxHeight: Int
				base64Width: Int
				grayscale: Boolean
				jpegProgressive: Boolean = true
				pngCompressionSpeed: Int = 4
				duotone: DuotoneGradient
				traceSVG: Potrace
				quality: Int
				jpegQuality: Int
				pngQuality: Int
				webpQuality: Int
				toFormat: ImageFormat
				toFormatBase64: ImageFormat
				cropFocus: ImageCropFocus = ATTENTION
				fit: ImageFit = COVER
				background: String = "rgba(0,0,0,1)"
				rotate: Int
				trim: Float
				sizes: String
		
				"""
				A list of image widths to be generated. Example: [ 200, 340, 520, 890 ]
				"""
				srcSetBreakpoints: [Int] = []
			): ImageSharpFluid
			gatsbyImageData(
				"""
				The layout for the image.
				FIXED: A static image sized, that does not resize according to the screen width
				FULL_WIDTH: The image resizes to fit its container. Pass a "sizes" option if
				it isn't going to be the full width of the screen.
				CONSTRAINED: Resizes to fit its container, up to a maximum width, at which point it will remain fixed in size.
				"""
				layout: ImageLayout = CONSTRAINED
		
				"""
				The display width of the generated image for layout = FIXED, and the maximum
				display width of the largest image for layout = CONSTRAINED.
				Ignored if layout = FLUID.
				"""
				width: Int
		
				"""
				The display height of the generated image for layout = FIXED, and the
				maximum display height of the largest image for layout = CONSTRAINED.
				The image will be cropped if the aspect ratio does not match the source
				image. If omitted, it is calculated from the supplied width,
				matching the aspect ratio of the source image.
				"""
				height: Int
		
				"""
				If set along with width or height, this will set the value of the other
				dimension to match the provided aspect ratio, cropping the image if needed.
				If neither width or height is provided, height will be set based on the intrinsic width of the source image.
				"""
				aspectRatio: Float
		
				"""
				Format of generated placeholder image, displayed while the main image loads.
				BLURRED: a blurred, low resolution image, encoded as a base64 data URI
				DOMINANT_COLOR: a solid color, calculated from the dominant color of the image (default).
				TRACED_SVG: deprecated. Will use DOMINANT_COLOR.
				NONE: no placeholder. Set "background" to use a fixed background color.
				"""
				placeholder: ImagePlaceholder
		
				"""
				Options for the low-resolution placeholder image. Set placeholder to "BLURRED" to use this
				"""
				blurredOptions: BlurredOptions
		
				"""
				Options for traced placeholder SVGs. You also should set placeholder to "TRACED_SVG".
				"""
				tracedSVGOptions: Potrace
		
				"""
				The image formats to generate. Valid values are "AUTO" (meaning the same
				format as the source image), "JPG", "PNG", "WEBP" and "AVIF".
				The default value is [AUTO, WEBP], and you should rarely need to change
				this. Take care if you specify JPG or PNG when you do
				not know the formats of the source images, as this could lead to unwanted
				results such as converting JPEGs to PNGs. Specifying
				both PNG and JPG is not supported and will be ignored.
				"""
				formats: [ImageFormat]
		
				"""
				A list of image pixel densities to generate. It will never generate images
				larger than the source, and will always include a 1x image.
				Default is [ 1, 2 ] for FIXED images, meaning 1x and 2x and [0.25, 0.5, 1,
				2] for CONSTRAINED. In this case, an image with a constrained layout
				and width = 400 would generate images at 100, 200, 400 and 800px wide.
				Ignored for FULL_WIDTH images, which use breakpoints instead
				"""
				outputPixelDensities: [Float]
		
				"""
				Specifies the image widths to generate. For FIXED and CONSTRAINED images it
				is better to allow these to be determined automatically,
				based on the image size. For FULL_WIDTH images this can be used to override
				the default, which is [750, 1080, 1366, 1920].
				It will never generate any images larger than the source.
				"""
				breakpoints: [Int]
		
				"""
				The "sizes" property, passed to the img tag. This describes the display size of the image.
				This does not affect the generated images, but is used by the browser to decide which images to download.
				You should usually leave this blank, and a suitable value will be calculated. The exception is if a FULL_WIDTH image
				does not actually span the full width of the screen, in which case you should pass the correct size here.
				"""
				sizes: String
		
				"""The default quality. This is overridden by any format-specific options"""
				quality: Int
		
				"""Options to pass to sharp when generating JPG images."""
				jpgOptions: JPGOptions
		
				"""Options to pass to sharp when generating PNG images."""
				pngOptions: PNGOptions
		
				"""Options to pass to sharp when generating WebP images."""
				webpOptions: WebPOptions
		
				"""Options to pass to sharp when generating AVIF images."""
				avifOptions: AVIFOptions
		
				"""
				Options to pass to sharp to control cropping and other image manipulations.
				"""
				transformOptions: TransformOptions
		
				"""
				Background color applied to the wrapper. Also passed to sharp to use as a
				background when "letterboxing" an image to another aspect ratio.
				"""
				backgroundColor: String
			): GatsbyImageData!
			original: ImageSharpOriginal
			resize(width: Int, height: Int, quality: Int, jpegQuality: Int, pngQuality: Int, webpQuality: Int, jpegProgressive: Boolean = true, pngCompressionLevel: Int = 9, pngCompressionSpeed: Int = 4, grayscale: Boolean, duotone: DuotoneGradient, base64: Boolean, traceSVG: Potrace, toFormat: ImageFormat, cropFocus: ImageCropFocus = ATTENTION, fit: ImageFit = COVER, background: String = "rgba(0,0,0,1)", rotate: Int, trim: Float): ImageSharpResize
		}
		
		interface ContentfulEntry implements Node {
			contentful_id: String!
			id: ID!
			node_locale: String!
		}
		
		interface ContentfulReference {
			contentful_id: String!
			id: ID!
		}
		
		enum ImageResizingBehavior {
			NO_CHANGE
		
			"""
			Same as the default resizing, but adds padding so that the generated image has the specified dimensions.
			"""
			PAD
		
			"""Crop a part of the original image to match the specified size."""
			CROP
		
			"""
			Crop the image to the specified dimensions, if the original image is smaller
			than these dimensions, then the image will be upscaled.
			"""
			FILL
		
			"""
			When used in association with the f parameter below, creates a thumbnail from the image based on a focus area.
			"""
			THUMB
		
			"""Scale the image regardless of the original aspect ratio."""
			SCALE
		}
		
		enum ContentfulImageCropFocus {
			TOP
			TOP_LEFT
			TOP_RIGHT
			BOTTOM
			BOTTOM_RIGHT
			BOTTOM_LEFT
			RIGHT
			LEFT
			FACE
			FACES
			CENTER
		}
		
		type ContentfulAsset implements ContentfulReference & Node & RemoteFile @derivedTypes @dontInfer {
			contentful_id: String!
			gatsbyImageData(
				"""
				The layout for the image.
				FIXED: A static image sized, that does not resize according to the screen width
				FULL_WIDTH: The image resizes to fit its container. Pass a "sizes" option if
				it isn't going to be the full width of the screen.
				CONSTRAINED: Resizes to fit its container, up to a maximum width, at which point it will remain fixed in size.
				"""
				layout: GatsbyImageLayout
		
				"""
				The display width of the generated image for layout = FIXED, and the display
				width of the largest image for layout = CONSTRAINED.
				The actual largest image resolution will be this value multiplied by the largest value in outputPixelDensities
				Ignored if layout = FLUID.
				"""
				width: Int
		
				"""
				If set, the height of the generated image. If omitted, it is calculated from
				the supplied width, matching the aspect ratio of the source image.
				"""
				height: Int
		
				"""
				If set along with width or height, this will set the value of the other
				dimension to match the provided aspect ratio, cropping the image if needed.
				If neither width or height is provided, height will be set based on the intrinsic width of the source image.
				"""
				aspectRatio: Float
		
				"""
				Format of generated placeholder image, displayed while the main image loads.
				BLURRED: a blurred, low resolution image, encoded as a base64 data URI.
				DOMINANT_COLOR: a solid color, calculated from the dominant color of the image (default).
				TRACED_SVG: deprecated. Will use DOMINANT_COLOR.
				NONE: no placeholder. Set the argument "backgroundColor" to use a fixed background color.
				"""
				placeholder: GatsbyImagePlaceholder
		
				"""
				The image formats to generate. Valid values are AUTO (meaning the same
				format as the source image), JPG, PNG, WEBP and AVIF.
				The default value is [AUTO, WEBP], and you should rarely need to change
				this. Take care if you specify JPG or PNG when you do
				not know the formats of the source images, as this could lead to unwanted
				results such as converting JPEGs to PNGs. Specifying
				both PNG and JPG is not supported and will be ignored.
				"""
				formats: [GatsbyImageFormat] = [NO_CHANGE, WEBP]
		
				"""
				A list of image pixel densities to generate for FIXED and CONSTRAINED
				images. You should rarely need to change this. It will never generate images
				larger than the source, and will always include a 1x image.
				Default is [ 1, 2 ] for fixed images, meaning 1x, 2x, 3x, and [0.25, 0.5, 1,
				2] for fluid. In this case, an image with a fluid layout and width = 400
				would generate images at 100, 200, 400 and 800px wide.
				"""
				outputPixelDensities: [Float]
		
				"""
				Specifies the image widths to generate. You should rarely need to change
				this. For FIXED and CONSTRAINED images it is better to allow these to be
				determined automatically,
				based on the image size. For FULL_WIDTH images this can be used to override
				the default, which is [750, 1080, 1366, 1920].
				It will never generate any images larger than the source.
				"""
				breakpoints: [Int]
		
				"""
				The "sizes" property, passed to the img tag. This describes the display size of the image.
				This does not affect the generated images, but is used by the browser to
				decide which images to download. You can leave this blank for fixed images,
				or if the responsive image
				container will be the full width of the screen. In these cases we will generate an appropriate value.
				"""
				sizes: String
		
				"""
				Background color applied to the wrapper, or when "letterboxing" an image to another aspect ratio.
				"""
				backgroundColor: String
				jpegProgressive: Boolean = true
				resizingBehavior: ImageResizingBehavior
				cropFocus: ContentfulImageCropFocus
		
				"""
				Desired corner radius in pixels. Results in an image with rounded corners.
				Pass '-1' for a full circle/ellipse.
				"""
				cornerRadius: Int
				quality: Int = 50
			): GatsbyImageData!
			spaceId: String
			createdAt: Date @dateformat
			updatedAt: Date @dateformat
			file: ContentfulAssetFile
			title: String
			description: String
			node_locale: String
			sys: ContentfulAssetSys
			url: String
			placeholderUrl: String
			mimeType: String
			filename: String
			width: Int
			height: Int
			size: Int
		}
		
		type ContentfulAssetFile @derivedTypes {
			url: String
			details: ContentfulAssetFileDetails
			fileName: String
			contentType: String
		}
		
		type ContentfulAssetFileDetails @derivedTypes {
			size: Int
			image: ContentfulAssetFileDetailsImage
		}
		
		type ContentfulAssetFileDetailsImage {
			width: Int
			height: Int
		}
		
		type ContentfulAssetSys {
			type: String
			revision: Int
		}
		
		type ContentfulBlogPost implements ContentfulReference & ContentfulEntry & Node @derivedTypes @dontInfer {
			contentful_id: String!
			node_locale: String!
			title: String!
			content: ContentfulBlogPostContent!
			slug: String!
			author: ContentfulAuthor! @link(by: "id", from: "author___NODE")
			spaceId: String
			createdAt: Date! @dateformat
			updatedAt: Date @dateformat
			sys: ContentfulBlogPostSys
		}
		
		type ContentfulBlogPostContent {
			raw: String!
		}
		
		type ContentfulAuthor implements ContentfulReference & ContentfulEntry & Node @derivedTypes @dontInfer {
			contentful_id: String!
			node_locale: String!
			name: String!
			slug: String!
			photo: ContentfulAsset! @link(by: "id", from: "photo___NODE")
			blog_post: [ContentfulBlogPost] @link(by: "id", from: "blog post___NODE") @proxy(from: "blog post___NODE")
			bio: contentfulAuthorBioTextNode! @link(by: "id", from: "bio___NODE")
			spaceId: String
			createdAt: Date! @dateformat
			updatedAt: Date @dateformat
			sys: ContentfulAuthorSys
		}
		
		type contentfulAuthorBioTextNode implements Node @derivedTypes @childOf(types: ["ContentfulAuthor"]) @dontInfer {
			bio: String!
			sys: contentfulAuthorBioTextNodeSys
		}
		
		type contentfulAuthorBioTextNodeSys {
			type: String
		}
		
		type ContentfulAuthorSys @derivedTypes {
			type: String
			revision: Int
			contentType: ContentfulAuthorSysContentType
		}
		
		type ContentfulAuthorSysContentType @derivedTypes {
			sys: ContentfulAuthorSysContentTypeSys
		}
		
		type ContentfulAuthorSysContentTypeSys {
			type: String
			linkType: String
			id: String
		}
		
		type ContentfulBlogPostSys @derivedTypes {
			type: String
			revision: Int
			contentType: ContentfulBlogPostSysContentType
		}
		
		type ContentfulBlogPostSysContentType @derivedTypes {
			sys: ContentfulBlogPostSysContentTypeSys
		}
		
		type ContentfulBlogPostSysContentTypeSys {
			type: String
			linkType: String
			id: String
		}
		
		type ContentfulStaticTextField implements ContentfulReference & ContentfulEntry & Node @derivedTypes @dontInfer {
			contentful_id: String!
			node_locale: String!
			name: String!
			textBody: ContentfulStaticTextFieldTextBody!
			spaceId: String
			createdAt: Date! @dateformat
			updatedAt: Date @dateformat
			sys: ContentfulStaticTextFieldSys
		}
		
		type ContentfulStaticTextFieldTextBody {
			raw: String!
		}
		
		type ContentfulStaticTextFieldSys @derivedTypes {
			type: String
			revision: Int
			contentType: ContentfulStaticTextFieldSysContentType
		}
		
		type ContentfulStaticTextFieldSysContentType @derivedTypes {
			sys: ContentfulStaticTextFieldSysContentTypeSys
		}
		
		type ContentfulStaticTextFieldSysContentTypeSys {
			type: String
			linkType: String
			id: String
		}
		
		type ContentfulContentType implements Node @derivedTypes @dontInfer {
			name: String
			displayField: String
			description: String
			sys: ContentfulContentTypeSys
		}
		
		type ContentfulContentTypeSys {
			type: String
		}
		`;

		createTypes(typeDefs);
	};
