import { Fragment } from "react";
import Header from "../../components/Header";
import Prose from "../../components/Prose";
import Footer from "../../components/Footer";

import "twin.macro";

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Meta, getMeta } from "../../utils/meta";
import { matchSlugsWithCategories } from "../../utils/utils";
import { toHtml, toJsx } from "../../utils/markdown";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Slug = (props: Record<string, string>) => {
	const { date, updated = "", contents } = props;

	return (
		<Fragment>
			<Header />
			<main tw="max-w-4xl mx-auto p-normal bg-gray-100 text-gray-700">
				<Prose>
					<header tw="flex text-gray-500">
						<p tw="mr-normal">{date}</p>
						{updated && <p>{`Updated: ${updated}`}</p>}
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
	const { slug } = context.params;
	const meta: Meta[] = await getMeta();
	const { date, updated = "" } = meta.filter((meta) => {
		return meta.slug === slug;
	})[0];

	return {
		props: {
			slug,
			date,
			updated,
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
