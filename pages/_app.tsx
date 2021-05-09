import type { AppProps } from "next/app";
import { Fragment } from "react";
import { GlobalStyles } from "twin.macro";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<Fragment>
			<GlobalStyles />
			<Component {...pageProps} />
		</Fragment>
	);
}

export default MyApp;
