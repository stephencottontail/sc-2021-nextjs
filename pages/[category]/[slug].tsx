import { Fragment } from "react";
import Header from "../../components/Header";
import Prose from "../../components/Prose";
import Footer from "../../components/Footer";

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { matchSlugsWithCategories } from "../../utils/utils";
import { toHtml, toJsx } from "../../utils/markdown";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Slug = (props: Record<string, string>) => {
	const { slug, contents } = props;

	return (
		<Fragment>
			<Header />
			<h1>{slug.toUpperCase()}</h1>
			<Prose>{toJsx(contents)}</Prose>
			<Footer />
		</Fragment>
	);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const { slug } = context.params;

	return {
		props: {
			slug,
			contents: toHtml(slug as string),
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const meta = await matchSlugsWithCategories();
	const params: Array<{ params: { [key: string]: string } }> = [];

	meta.forEach((meta) => {
		params.push({
			params: {
				category: meta.category,
				slug: meta.slug,
			},
		});
	});

	return {
		paths: params,
		fallback: false,
	};
};

export default Slug;
