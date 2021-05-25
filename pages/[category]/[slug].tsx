import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

const Slug = (props: Record<string, string>): JSX.Element | null => {
	const { slug } = props;

	return <h1>{slug.toUpperCase()}</h1>;
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return {
		props: {
			slug: context.params.slug,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	// code that fetches slugs and matches
	// with the appropriate category

	return {
		paths: [
			{ params: { category: "foo", slug: "bar" } },
			{ params: { category: "baz", slug: "qux" } },
		],
		fallback: false,
	};
};

export default Slug;
