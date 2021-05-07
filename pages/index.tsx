import fs from "fs";
import { join } from "path";
import { GetStaticProps } from "next";

import remark from "remark";
import frontmatter from "remark-frontmatter";
import extract from "remark-extract-frontmatter";
import yaml from "yaml";

const hasKeys = <T extends object, K extends PropertyKey>(
	obj: T,
	keys: K | K[]
): obj is T & { [P in K]: unknown } => {
	return Array.isArray(keys) ? keys.every((k) => k in obj) : keys in obj;
};

const HomePage = (props: Record<string, string[]>): JSX.Element => {
	const { cats } = props;

	return (
		<div>
			{cats.map((cat, index) => (
				<p key={index}>{cat}</p>
			))}
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const cats: string[] = [];
	const path = join(process.cwd(), "posts");
	const posts = fs.readdirSync(path);

	posts.forEach(async (post) => {
		const contents = fs.readFileSync(join(path, post));
		const results = await remark()
			.use(frontmatter, ["yaml"])
			.use(extract, { yaml: yaml.parse })
			.process(contents);

		if (typeof results.data === "object" &&
			hasKeys(results.data, "category")) {
			cats.push(results.data.category as string);
		}
	});

	return {
		props: { cats },
	};
};

export default HomePage;
