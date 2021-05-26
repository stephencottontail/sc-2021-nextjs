import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { matchSlugsWithCategories } from "../../utils/utils";

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
