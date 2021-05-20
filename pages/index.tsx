import { createElement, Fragment } from "react";

import fs from "fs";
import { join } from "path";
import { GetStaticProps } from "next";

import remark from "remark";
import frontmatter from "remark-frontmatter";
import extract from "remark-extract-frontmatter";
import yaml from "yaml";
import toRehype from "remark-rehype";
import toReact from "rehype-react";
import sanitize from "rehype-sanitize";

import Prose from "../components/Prose";

interface Frontmatter {
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

const isFrontmatter = (obj: object): obj is Frontmatter => {
	return hasOwnProperty(obj, ["title", "date", "slug", "category"]);
};

const HomePage = (props: Record<string, string[]>): JSX.Element => {
	const { els } = props;

	return (
		<Prose>
			{JSON.parse(els[0], (k, v) => {
				const matches = v && v.match && v.match(/^\$\$Symbol:(.*)$/);

				return matches ? Symbol.for(matches[1]) : v;
			})}
		</Prose>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const cats: string[] = [];
	const els: string[] = [];

	const path = join(process.cwd(), "posts", "Typography.md");
	const contents = fs.readFileSync(path);
	const results = await remark()
		.use(frontmatter, [{ type: "yaml", anywhere: true, marker: "-" }])
		.use(extract, { yaml: yaml.parse })
		.use(toRehype)
		.use(toReact, { createElement, Fragment })
		.use(sanitize)
		.process(contents);

	if (
		typeof results.result === "object" &&
		typeof results.data === "object" &&
		isFrontmatter(results.data)
	) {
		cats.push(results.data.category);
		els.push(
			JSON.stringify(results.result, (k, v) =>
				typeof v === "symbol" ? `$$Symbol:${Symbol.keyFor(v)}` : v
			)
		);
	}

	return {
		props: { cats, els },
	};
};

export default HomePage;
