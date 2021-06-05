import tw from "twin.macro";
import Link from "next/link";

const Text = tw.div`flex flex-col space-y-smaller ml-normal`;

const Footer = (): JSX.Element => (
	<footer
		css={{
			...tw`w-full max-w-4xl mx-auto p-normal bg-gray-100 text-gray-700 flex`,
			a: tw`text-blue-700 font-bold underline hover:no-underline focus:no-underline`,
		}}
	>
		<Link href="/" passHref>
			<a>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fillRule="evenodd"
					strokeLinejoin="round"
					strokeMiterlimit="2"
					clipRule="evenodd"
					viewBox="0 0 512 512"
					height="128"
					width="128"
				>
					<circle
						id="background"
						cx="366"
						cy="76.129"
						r="99.945"
						fill="#498fb1"
						transform="translate(-681.475 61.0013) scale(2.56141)"
					/>
					<path
						id="yin"
						fill="#252627"
						fillRule="nonzero"
						d="M.23-.532C.176-.556.136-.535.13-.531c-.069.048-.039.104-.012.115.044.016.046.052.044.067-.002.026-.034.044-.054.046C.035-.298.002-.379.022-.445.04-.503.081-.539.118-.55c.066-.02.112.018.112.018z"
						transform="rotate(-4.7521 10920.2323 -463.7277) scale(1521.47)"
					/>
					<path
						id="yang"
						fill="#f9fcff"
						fillRule="nonzero"
						d="M.23-.532C.176-.556.136-.535.13-.531c-.069.048-.039.104-.012.115.044.016.046.052.044.067-.002.026-.034.044-.054.046C.035-.298.002-.379.022-.445.04-.503.081-.539.118-.55c.066-.02.112.018.112.018z"
						transform="rotate(175.2479 226.1362 -186.5132) scale(1521.47)"
					/>
				</svg>
			</a>
		</Link>
		<Text>
			<p>stephen</p>
			<Link href="https://twitter.com/s_cottontail24">Twitter</Link>
			<Link href="https://github.com/stephencottontail">GitHub</Link>
		</Text>
	</footer>
);

export default Footer;
