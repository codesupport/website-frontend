import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class CustomDocument extends Document {
	static getInitialProps({renderPage}) {
		const sheet = new ServerStyleSheet();
		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />),
		);

		const styleTags = sheet.getStyleElement();

		return {...page, styleTags};
	}

	render() {
		return (
			<Html>
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