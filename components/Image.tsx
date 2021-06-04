import Image from "next/image";

const MyImage = (props: Record<string, string>): JSX.Element => {
	const { src, alt = "", title = "", height, width } = props;
	const realSrc = src.replace("public", "");

	return (
		<Image
			src={realSrc}
			alt={alt}
			title={title}
			height={height}
			width={width}
		/>
	);
};

export default MyImage;
