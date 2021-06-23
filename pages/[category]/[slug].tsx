import { Fragment } from "react";
import "twin.macro";

import Header from "../../components/Header";
import Prose from "../../components/Prose";
import Footer from "../../components/Footer";
import { Meta, getMeta } from "../../utils/meta";
import { matchSlugsWithCategories } from "../../utils/utils";
import { toHtml, toJsx } from "../../utils/markdown";

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Slug = (props: Record<string, string>) => {
	const { category, title, date, updated = "", slug, contents } = props;
	const metaTitle = `${title} | Stephen`;
	const metaUrl = `https://stephencottontail.com/${category}/${slug}`;

	return (
		<Fragment>
			<Head>
				<title>{metaTitle}</title>
				<meta property="og:title" content={metaTitle} key="title" />
				<meta property="og:type" content="article" key="type" />
				<meta property="og:url" content={metaUrl} key="url" />
			</Head>
			<Header />
			<main tw="max-w-4xl mx-auto p-normal bg-gray-100 text-gray-700">
				<Prose>
					<header tw="flex flex-col md:flex-row text-gray-500">
						<span tw="md:mr-normal">{date}</span>
						{updated && <span>{`Updated: ${updated}`}</span>}
					</header>
					{toJsx(contents)}
				</Prose>
			</main>
			<Footer />
		</Fragment>
	);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const { category, slug } = context.params;
	const meta: Meta[] = await getMeta();
	const { title, date, updated = "" } = meta.filter((meta) => {
		return meta.slug === slug;
	})[0];

	return {
		props: {
			category,
			title,
			date,
			updated,
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
