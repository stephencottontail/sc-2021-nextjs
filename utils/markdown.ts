import fs from "fs";
import { join } from "path";

import { createElement, Fragment } from "react";
import MyImage from "../components/Image";
import MyLink from "../components/Link";

import remark from "remark";
import frontmatter from "remark-frontmatter";
import extract from "remark-extract-frontmatter";
import yaml from "yaml";
import unwrap from "remark-unwrap-images";
import toRehype from "remark-rehype";
import toString from "rehype-stringify";
import size from "rehype-img-size";
import toReact from "rehype-react";
import unified from "unified";
import parse from "rehype-parse";

export const toHtml = (slug: string): string => {
	const contents = remark()
		.use(frontmatter, [{ type: "yaml", anywhere: true, marker: "-" }])
		.use(extract, { yaml: yaml.parse })
		.use(unwrap)
		.use(toRehype)
		.use(size)
		.use(toString)
		.processSync(
			fs.readFileSync(join(process.cwd(), "public", slug + ".md"))
		);

	return contents.contents as string;
};

export const toJsx = (html: string): JSX.Element => {
	const content = unified()
		.use(parse, {
			fragment: true,
		})
		.use(toReact, {
			createElement: createElement,
			Fragment: Fragment,
			components: {
				img: MyImage,
				a: MyLink,
			},
		})
		.processSync(html);

	return content.result as JSX.Element;
};
