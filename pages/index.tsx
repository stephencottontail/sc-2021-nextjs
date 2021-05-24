import { Fragment } from "react";

import tw from "twin.macro";

import fs from "fs";
import { join } from "path";
import { GetStaticProps } from "next";

import remark from "remark";
import frontmatter from "remark-frontmatter";
import extract from "remark-extract-frontmatter";
import yaml from "yaml";

import Link from "next/link";

interface Meta {
	title: "string";
	date: "string";
	slug: "string";
	category: "string";
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const HomePage = (props: Record<string, string[]>) => {
	const { cats } = props;

	return (
		<Fragment>
			<div
				css={{
					...tw`grid grid-cols-7`,
					"> div": {
						height: "150px",
					},
				}}
			>
				<div tw="bg-blue-100"></div>
				<div tw="bg-blue-200"></div>
				<div tw="bg-blue-300"></div>
				<div tw="bg-blue-400"></div>
				<div tw="bg-blue-500"></div>
				<div tw="bg-blue-600"></div>
				<div tw="bg-blue-700"></div>
				<div tw="bg-gray-100"></div>
				<div tw="bg-gray-200"></div>
				<div tw="bg-gray-300"></div>
				<div tw="bg-gray-400"></div>
				<div tw="bg-gray-500"></div>
				<div tw="bg-gray-600"></div>
				<div tw="bg-gray-700"></div>
			</div>
			<div tw="grid grid-cols-3 gap-normal bg-gray-100 text-gray-700">
				{cats.map((cat, i) => (
					<p key={i} tw="bg-gray-200 p-normal text-center">
						<Link href={`/category/${cat}`}>{cat}</Link>
					</p>
				))}
			</div>
		</Fragment>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const cats: string[] = [];
	const path = join(process.cwd(), "posts");
	const posts = fs.readdirSync(path).filter((file) => {
		return file.includes(".md");
	});

	posts.forEach(async (post) => {
		const results = await remark()
			.use(frontmatter, [{ type: "yaml", anywhere: true, marker: "-" }])
			.use(extract, { yaml: yaml.parse })
			.process(fs.readFileSync(join(path, post)));

		if (typeof results.data === "object" && isMeta(results.data)) {
			cats.push(results.data.category);
		}
	});

	return {
		props: { cats },
	};
};

export default HomePage;
