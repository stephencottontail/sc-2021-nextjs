import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

const Category = (): JSX.Element | null => {
	return <h1>Category!</h1>;
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	console.log(context);

	return {
		props: {
			cat: "hi",
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	// boring code to fetch all categories
	const cats = ["nextjs", "testing", "foo"];

	return {
		paths: [{ params: { cat: cats } }],
		fallback: false,
	};
};

export default Category;
