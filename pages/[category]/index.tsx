import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

const Category = (props: Record<string, string>): JSX.Element | null => {
	const { category } = props;

	return <h1>{category.toUpperCase()}</h1>;
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return {
		props: {
			category: context.params.category,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	// code that fetches the categories

	return {
		paths: [
			{ params: { category: "foo" } },
			{ params: { category: "bar" } },
		],
		fallback: false,
	};
};

export default Category;
