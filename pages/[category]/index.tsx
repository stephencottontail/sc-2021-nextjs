import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { fetchCategories } from "../../utils/utils";

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
