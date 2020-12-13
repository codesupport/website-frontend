import React from "react";
import Head from "next/head";
import Navigation from "../molecules/Navigation";
import Footer from "../molecules/Footer";

const SUMMARY_CARD = "summary";
const LARGE_IMAGE_CARD = "summary_large_image";
const DEFAULT_DESCRIPTION = "CodeSupport is a community dedicated to giving guidance about programming, as well as creating conversation with one another. No matter your skill level, you are welcome in this community.";
const DEFAULT_IMAGE = "https://codesupport.dev/logo.png";

function PageTemplate({ children, page, meta }) {
	return (
		<>
			<Head>
				<title>{page} - CodeSupport</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#1457B3" />
				<meta name="description" content={meta?.description ?? DEFAULT_DESCRIPTION} />
				<meta name="twitter:card" content={meta?.image ? LARGE_IMAGE_CARD : SUMMARY_CARD} />
				<meta name="twitter:image" content={meta?.image ?? DEFAULT_IMAGE} />
				<meta name="twitter:site" content="@codesupportdev" />
				<meta name="twitter:title" content={`${page} - CodeSupport`} />
				<meta name="twitter:description" content={meta?.description ?? DEFAULT_DESCRIPTION} />
			</Head>
			<Navigation />
			{children}
			<Footer />
		</>
	);
}

export default PageTemplate;