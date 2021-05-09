import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from "next/document";
import "twin.macro";

class MyDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx);

		return { ...initialProps };
	}

	render(): JSX.Element {
		return (
			<Html>
				<Head />
				<body tw="bg-gray-100 text-gray-700 antialiased">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
