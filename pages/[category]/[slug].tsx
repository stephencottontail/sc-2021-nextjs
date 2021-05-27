import fs from "fs";
import { join } from "path";

import { Fragment } from "react";
import Prose from "../../components/Prose";

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { matchSlugsWithCategories } from "../../utils/utils";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Slug = (props: Record<string, string>) => {
	const { slug, markdown } = props;

	return (
		<Fragment>
			<h1>{slug.toUpperCase()}</h1>
			<Prose markdown={markdown} />
		</Fragment>
	);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const { slug } = context.params;
	const markdown = fs.readFileSync(
		join(process.cwd(), "posts", slug + ".md")
	);

	return {
		props: {
			slug,
			markdown: markdown.toString(),
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
