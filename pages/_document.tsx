import "twin.macro";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head />
				<body tw="bg-gray-100 text-gray-700">
					<Main />
					<NextScript />
					<style jsx global>{`
						#__next {
							display: flex;
							flex-direction: column;
							min-height: 100vh;
							height: 100%;
						}

						main {
							flex: 1;
							width: 100%;
						}
					`}</style>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
