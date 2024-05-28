import "../styles/style.css";
import {AppProps} from "next/app";
import {Open_Sans as openSansFont, Raleway as ralewayFont} from "next/font/google";

const raleway = ralewayFont({
	display: "swap",
	style: ["normal", "italic"],
	subsets: ["latin"]
});

const openSans = openSansFont({
	display: "swap",
	style: ["normal", "italic"],
	subsets: ["latin"]
});

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>
				{`
					:root {
							--font-family-heading: ${raleway.style.fontFamily};
							--font-family-body: ${openSans.style.fontFamily};
					}
				`}
			</style>
			<Component {...pageProps} />
		</>
	);
}

export default App;
