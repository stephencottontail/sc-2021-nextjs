import Head from "next/head";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import { Global, css } from "@emotion/react";
import tw, { GlobalStyles } from "twin.macro";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<Fragment>
			<Head>
				<title>Stephen</title>
				<link
					rel="icon"
					type="image/png"
					sizes="512x512"
					href="/images/sc-2021-nextjs.png"
				/>
				<meta
					name="description"
					content="I'm Stephen, and I'm not a real web developer. Or am I? It's hard to know anymore."
				/>
				<meta property="og:title" content="Stephen" key="title" />
				<meta property="og:type" content="website" key="type" />
				<meta
					property="og:url"
					content="https://stephencottontail.com/"
					key="url"
				/>
				<meta
					property="og:image"
					content="https://stephencottontail.com/images/sc-2021-nextjs.png"
				/>
				<meta property="og:image:height" content="512" />
				<meta property="og:image:width" content="512" />
			</Head>
			<Global
				styles={css`
					#__next {
						display: flex;
						flex-direction: column;
						min-height: 100vh;
						height: 100%;
						${tw`bg-gray-100`}
					}
					#__next main {
						flex: 1;
						width: 100%;
					}
				`}
			/>
			<GlobalStyles />
			<Component {...pageProps} />
		</Fragment>
	);
}

export default MyApp;
