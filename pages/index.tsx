import React from "react";

import fs from "fs";
import { join } from "path";
import { GetStaticProps } from "next";

import remark from "remark";
import frontmatter from "remark-frontmatter";
import extract from "remark-extract-frontmatter";
import toRehype from "remark-rehype";
import toReact from "rehype-react";
import sanitize from "rehype-sanitize";
import yaml from "yaml";

const hasKeys = <T, K extends PropertyKey>(
	obj: T,
	keys: K | K[]
): obj is T & { [P in K]: unknown } => {
	return (
		null != obj &&
		(Array.isArray(keys)
			? keys.every((k) => k in Object(obj))
			: keys in Object(obj))
	);
};

const HomePage = (props: Record<string, string[]>): JSX.Element => {
	const { els } = props;

	return (
		<div>
			{JSON.parse(els[0], (k, v) => {
				const matches = v && v.match && v.match(/^\$\$Symbol:(.*)$/);

				return matches ? Symbol.for(matches[1]) : v;
			})}
		</div>
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
		.use(toReact, { createElement: React.createElement })
		.use(sanitize)
		.process(contents);

	if (
		typeof results.result === "object" &&
		typeof results.data === "object" &&
		hasKeys(results.data, "category")
	) {
		cats.push(results.data.category as string);
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
