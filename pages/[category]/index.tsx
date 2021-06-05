import { Fragment } from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";

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

	return (
		<Fragment>
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
							<header tw="flex text-gray-500">
								<p tw="mr-normal">{post.date}</p>
								{post.updated && (
									<p>{`Updated: ${post.updated}`}</p>
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
