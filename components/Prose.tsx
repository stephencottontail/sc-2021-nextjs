import tw from "twin.macro";

import { createElement, Fragment } from "react";
import remark from "remark";
import frontmatter from "remark-frontmatter";
import extract from "remark-extract-frontmatter";
import yaml from "yaml";
import toRehype from "remark-rehype";
import toReact from "rehype-react";

const Prose = ({ markdown }: { markdown: string }): JSX.Element => {
	const contents = remark()
		.use(frontmatter, [{ type: "yaml", anywhere: true, marker: "-" }])
		.use(extract, { yaml: yaml.parse })
		.use(toRehype)
		.use(toReact, { createElement, Fragment })
		.processSync(markdown);

	return (
		<article
			css={{
				...tw`p-normal bg-gray-100 text-gray-700`,
				h1: tw`mb-normal font-extrabold text-4xl`,
				h2: tw`mb-normal font-bold text-2xl`,
				h3: tw`mb-normal font-bold text-xl`,
				p: tw`mb-normal`,
				a: tw`font-bold text-blue-700 border-blue-700 border-b-2 focus:border-b-4 hover:border-b-4 active:border-b-4 motion-safe:transition-all`,
				ul: {
					...tw`mb-normal pl-normal list-disc list-inside`,
					ul: {
						...tw`m-none`,
					},
					ol: {
						...tw`m-none`,
					},
				},
				ol: {
					...tw`mb-normal pl-normal list-decimal list-inside`,
					ul: {
						...tw`m-none`,
					},
					ol: {
						...tw`m-none`,
					},
				},
				code: {
					...tw`bg-gray-700 text-gray-100`,
					padding: "2px",
					borderRadius: "4px",
				},
				blockquote: {
					...tw`space-y-normal mb-normal p-normal bg-blue-100`,
					p: {
						...tw`m-none`,
					},
				},
				pre: {
					...tw`mb-normal p-normal overflow-x-scroll`,
					code: {
						...tw`p-none bg-gray-100 text-gray-700`,
					},
				},
			}}
		>
			{contents.result}
		</article>
	);
};

export default Prose;
