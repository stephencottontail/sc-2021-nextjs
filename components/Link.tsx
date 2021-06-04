import Link from "next/link";

type LinkProps = {
	href: "string";
	children: Record<string, unknown>;
};

const MyLink = (props: LinkProps): JSX.Element => {
	const { href, children } = props;

	return (
		<Link href={href}>
			{href.startsWith("/") ? (
				<a>{children}</a>
			) : (
				<a href={href} rel="noopener noreferrer" target="_blank">
					{children}
				</a>
			)}
		</Link>
	);
};

export default MyLink;
