import { Fragment } from "react";
import tw, { styled } from "twin.macro";

import { GetStaticProps } from "next";
import Link from "next/link";
import { fetchCategories } from "../utils/utils";

import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { toHtml, toJsx } from "../utils/markdown";

interface HomeProps {
	cats: string[];
	content: string;
}

const Intro = styled.div({
	...tw`p-normal bg-gray-100 text-gray-700`,
	a: tw`font-bold text-blue-700 border-blue-700 border-b-2 focus:border-b-4 hover:border-b-4 active:border-b-4 motion-safe:transition-all`,
});

const Garden = styled.div({
	...tw`p-normal grid md:grid-cols-3 gap-normal bg-gray-100 text-gray-700`,
	a: tw`p-normal bg-blue-100 text-blue-700 font-bold text-center hover:bg-blue-200 focus:bg-blue-200 active:bg-blue-200 motion-safe:transition-colors`,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const HomePage = (props: HomeProps) => {
	const { cats, content } = props;

	return (
		<Fragment>
			<Hero />
			<main tw="max-w-4xl mx-auto">
				<Intro>{toJsx(content)}</Intro>
				<Garden>
					{cats.map((cat, i) => (
						<Link href={`/${cat}`} key={i}>
							<a>{cat}</a>
						</Link>
					))}
				</Garden>
			</main>
			<Footer />
		</Fragment>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const cats = await fetchCategories();

	return {
		props: {
			cats: cats,
			content: toHtml("home"),
		},
	};
};

export default HomePage;
