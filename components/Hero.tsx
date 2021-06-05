import tw from "twin.macro";
import Link from "next/link";

const Hero = (): JSX.Element => {
	return (
		<header
			css={{
				...tw`w-full max-w-4xl mx-auto flex flex-col justify-center px-normal py-larger bg-gray-100 text-2xl md:text-4xl font-bold leading-none`,
				a: tw`text-gray-300 underline hover:no-underline focus:no-underline`,
			}}
		>
			<p tw="text-gray-200">not a real developer</p>
			<p tw="text-gray-300">welcome to the garden</p>
			<h1 tw="my-normal text-gray-700">stephen</h1>
			<Link href="https://github.com/stephencottontail">
				in the Arctic Code Vault, though
			</Link>
		</header>
	);
};

export default Hero;
