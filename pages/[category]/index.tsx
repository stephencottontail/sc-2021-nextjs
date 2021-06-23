import { Fragment } from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import Head from "next/head";

import "twin.macro";

import { fetchCategories, getPostsByCategory } from "../../utils/utils";
import { Meta } from "../../utils/meta";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Category = (props: {
	category: string;
	posts: Array<Meta>;
}): JSX.Element | null => {
	const { posts, category } = props;
	const metaTitle = `${category} | Stephen`;
	const metaUrl = `https://stephencottontail.com/${category}`;

	return (
		<Fragment>
			<Head>
				<title>{metaTitle}</title>
				<meta property="og:title" content={metaTitle} key="title" />
				<meta property="og:url" content={metaUrl} key="url" />
			</Head>
			<Header />
			<main tw="max-w-4xl mx-auto p-normal bg-gray-100 text-gray-700">
				{posts &&
					posts.map((post) => (
						<article tw="mb-normal" key={post.date}>
							<h2 tw="font-mono text-xl">
								<Link
									href={{
										pathname: "/[category]/[slug]",
										query: {
											category: category,
											slug: post.slug,
										},
									}}
								>
									<a tw="underline hover:no-underline focus:no-underline active:no-underline">{`/${category}/${post.slug}.md`}</a>
								</Link>
							</h2>
							<header tw="flex flex-col md:flex-row text-gray-500">
								<span tw="md:mr-normal">{post.date}</span>
								{post.updated && (
									<span>{`Updated: ${post.updated}`}</span>
								)}
							</header>
						</article>
					))}
			</main>
			<Footer />
		</Fragment>
	);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const { category } = context.params;
	const posts = await getPostsByCategory(category as string);

	return {
		props: {
			category: context.params.category,
			posts,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const cats = await fetchCategories();
	const paths = cats.map((cat) => {
		return { params: { category: cat } };
	});

	return {
		paths: paths,
		fallback: false,
	};
};

export default Category;
