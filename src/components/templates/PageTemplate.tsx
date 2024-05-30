import {PropsWithChildren, useState} from "react";
import Head from "next/head";
import Navigation from "../molecules/Navigation";
import Footer from "../molecules/Footer";
import {useRouter} from "next/router";
import NavigationMobile from "../molecules/NavigationMobile";

const BASE_URL = "https://codesupport.dev";
const SUMMARY_CARD = "summary";
const LARGE_IMAGE_CARD = "summary_large_image";
const DEFAULT_DESCRIPTION = "CodeSupport is a community dedicated to giving guidance about programming, as well as creating conversation with one another. No matter your skill level, you are welcome in this community.";
const DEFAULT_IMAGE = "https://codesupport.dev/logo.png";

export type PageTemplateProps = PropsWithChildren<{
	page: string;
	meta?: {
		schema?: object;
		description?: string;
		image?: string;
	};
}>;

function PageTemplate({ children, page, meta }: PageTemplateProps) {
	const router = useRouter();
	const path = router.asPath === "/" ? "" : router.asPath;
	const canonical = `${BASE_URL}${path}`.split("?")[0];
	const [mobileNavigationIsOpen, setMobileNavigationIsOpen] = useState(false);

	return (
		<>
			<Head>
				<title>{`${page} - CodeSupport`}</title>
				<link rel="canonical" href={canonical} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#1457B3" />
				<meta name="description" content={meta?.description ?? DEFAULT_DESCRIPTION} />
				<meta name="twitter:card" content={meta?.image ? LARGE_IMAGE_CARD : SUMMARY_CARD} />
				<meta name="twitter:image" content={meta?.image ?? DEFAULT_IMAGE} />
				<meta name="twitter:site" content="@codesupportdev" />
				<meta name="twitter:title" content={`${page} - CodeSupport`} />
				<meta name="twitter:description" content={meta?.description ?? DEFAULT_DESCRIPTION} />
				{meta?.schema && (
					<script type="application/ld+json">
						{JSON.stringify(meta.schema)}
					</script>
				)}
			</Head>
			<Navigation setMobileNavigationIsOpen={setMobileNavigationIsOpen} />
			<NavigationMobile mobileNavigationIsOpen={mobileNavigationIsOpen} setMobileNavigationIsOpen={setMobileNavigationIsOpen} />
			{children}
			<Footer />
		</>
	);
}

export default PageTemplate;
