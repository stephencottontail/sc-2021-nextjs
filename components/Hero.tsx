import tw from "twin.macro";
import Link from "next/link";
import Wrap from "./Wrap";

const Hero = (): JSX.Element => {
	return (
		<div
			css={{
				...tw`flex flex-col justify-center px-normal py-larger  bg-gray-100 text-2xl md:text-4xl font-bold leading-none`,
				a: tw`text-gray-300 underline hover:no-underline focus:no-underline`,
			}}
		>
			<Wrap>
				<p tw="text-gray-200">not a real developer</p>
				<p tw="text-gray-300">welcome to the garden</p>
				<h1 tw="my-normal text-gray-700">steve</h1>
				<Link href="https://github.com/stephencottontail">
					in the Arctic Code Vault, though
				</Link>
			</Wrap>
		</div>
	);
};

export default Hero;
