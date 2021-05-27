import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { fetchCategories, getPostsByCategory } from "../../utils/utils";
import { Meta } from "../../utils/meta";
import { Fragment } from "react";

const Category = (props: {
	category: string;
	posts: Array<Meta>;
}): JSX.Element | null => {
	const { posts, category } = props;

	return (
		<Fragment>
			<h1>{category.toUpperCase()}</h1>
			{posts && posts.map((post) => <p key={post.date}>{post.slug}</p>)}
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
