import Document, {Html, Head, Main, NextScript, DocumentContext} from "next/document";
import { ServerStyleSheet } from "styled-components";
import {ReactNode} from "react";

class CustomDocument extends Document<{styleTags: ReactNode[]}> {
	static async getInitialProps({renderPage}: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />),
		);

		const styleTags = sheet.getStyleElement();

		return {...page, styleTags};
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
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