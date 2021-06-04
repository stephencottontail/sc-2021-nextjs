import tw from "twin.macro";
import Link from "next/link";
import Wrap from "./Wrap";

const Header = (): JSX.Element => {
	return (
		<header css={{ ...tw`p-normal bg-gray-100 text-gray-700` }}>
			<Wrap>
				<Link href="/" passHref>
					<a tw="font-bold text-2xl underline hover:no-underline focus:no-underline">
						{"stephen"}
					</a>
				</Link>
			</Wrap>
		</header>
	);
};

export default Header;
