import { Meta, getMeta } from "./meta";
interface Path {
	[key: string]: "string";
}

export const fetchCategories = async (): Promise<string[]> => {
	const meta = await getMeta();
	const cats: string[] = [];

	meta.forEach((meta) => {
		cats.push(meta.category);
	});

	return [...Array.from(new Set(cats))];
};

export const matchSlugsWithCategories = async (): Promise<Array<Path>> => {
	const meta = await getMeta();
	const paths: Array<Path> = [];

	meta.forEach((meta) => {
		paths.push({
			category: meta.category,
			slug: meta.slug,
		});
	});

	return paths;
};

export const getPostsByCategory = async (
	category: string
): Promise<Array<Meta>> => {
	const meta = await getMeta();

	return meta.filter((meta) => {
		return meta.category === category;
	});
};
