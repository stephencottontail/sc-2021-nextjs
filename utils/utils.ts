import fs from "fs";
import { join } from "path";

import remark from "remark";
import frontmatter from "remark-frontmatter";
import extract from "remark-extract-frontmatter";
import yaml from "yaml";

interface Meta {
	title: "string";
	date: "string";
	slug: "string";
	category: "string";
}

interface Path {
	[key: string]: "string";
}

const hasOwnProperty = <X extends object, Y extends PropertyKey>(
	obj: X,
	keys: Y | Y[]
): obj is X & Record<Y, unknown> => {
	return Array.isArray(keys) ? keys.every((k) => k in obj) : keys in obj;
};

const isMeta = (obj: object): obj is Meta => {
	return hasOwnProperty(obj, ["title", "date", "slug", "category"]);
};

const getMeta = async (): Promise<Array<Meta>> => {
	const meta: Array<Meta> = [];

	const path = join(process.cwd(), "posts");
	const posts = fs.readdirSync(path).filter((file) => {
		return file.includes(".md");
	});

	for (let i = 0; i < posts.length; i++) {
		const results = await remark()
			.use(frontmatter, [{ type: "yaml", anywhere: true, marker: "-" }])
			.use(extract, { yaml: yaml.parse })
			.process(fs.readFileSync(join(path, posts[i])));

		if (typeof results.data === "object" && isMeta(results.data)) {
			meta.push(results.data);
		}
	}

	return meta;
};

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
