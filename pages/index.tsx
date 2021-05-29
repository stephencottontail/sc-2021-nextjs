import { Fragment } from "react";
import tw from "twin.macro";

import { GetStaticProps } from "next";
import Link from "next/link";
import { fetchCategories } from "../utils/utils";

import Hero from "../components/Hero";
import Footer from "../components/Footer";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const HomePage = (props: Record<string, string[]>) => {
	const { cats } = props;

	return (
		<Fragment>
			<Hero />
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
						<Link href={`/${cat}`}>{cat}</Link>
					</p>
				))}
			</div>
			<Footer />
		</Fragment>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const cats = await fetchCategories();

	return {
		props: { cats },
	};
};

export default HomePage;
