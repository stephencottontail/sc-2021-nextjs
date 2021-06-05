import "twin.macro";
import Link from "next/link";

const Header = (): JSX.Element => {
	return (
		<header tw="w-full max-w-4xl mx-auto p-normal bg-gray-100 text-gray-700">
			<Link href="/" passHref>
				<a tw="font-bold text-2xl underline hover:no-underline focus:no-underline">
					{"stephen"}
				</a>
			</Link>
		</header>
	);
};

export default Header;
