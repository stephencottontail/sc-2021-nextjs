import fs from "fs";
import { join } from "path";

import { createElement, Fragment } from "react";
import Header from "../../components/Header";
import Prose from "../../components/Prose";
import Footer from "../../components/Footer";
import MyImage from "../../components/Image";

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { matchSlugsWithCategories } from "../../utils/utils";

import remark from "remark";
import frontmatter from "remark-frontmatter";
import extract from "remark-extract-frontmatter";
import yaml from "yaml";
import unwrap from "remark-unwrap-images";
import toRehype from "remark-rehype";
import toReact from "rehype-react";
import toString from "rehype-stringify";
import unified from "unified";
import parse from "rehype-parse";
import size from "rehype-img-size";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Slug = (props: Record<string, string>) => {
	const { slug, contents } = props;
	const content = unified()
		.use(parse, {
			fragment: true,
		})
		.use(toReact, {
			createElement: createElement,
			Fragment: Fragment,
			components: {
				img: MyImage,
			},
		})
		.processSync(contents);

	return (
		<Fragment>
			<Header />
			<h1>{slug.toUpperCase()}</h1>
			<Prose>{content.result}</Prose>
			<Footer />
		</Fragment>
	);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const { slug } = context.params;
	const contents = await remark()
		.use(frontmatter, [{ type: "yaml", anywhere: true, marker: "-" }])
		.use(extract, { yaml: yaml.parse })
		.use(unwrap)
		.use(toRehype)
		.use(size)
		.use(toString)
		.process(fs.readFileSync(join(process.cwd(), "public", slug + ".md")));

	return {
		props: {
			slug,
			contents: contents.contents as string,
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
