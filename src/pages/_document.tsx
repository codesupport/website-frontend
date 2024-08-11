import Document, {Html, Head, Main, NextScript, DocumentContext} from "next/document";
import { ServerStyleSheet } from "styled-components";
import {ReactNode} from "react";

class CustomDocument extends Document<{styleTags: ReactNode[]}> {
	static async getInitialProps({renderPage}: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const page = await renderPage(App => props =>
			sheet.collectStyles(<App {...props} />)
		);

		const styleTags = sheet.getStyleElement();

		return {...page, styleTags};
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					{this.props.styleTags}
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		);
	}
}

export default CustomDocument;

// Source: https://dev.to/aprietof/nextjs--styled-components-the-really-simple-guide----101c
