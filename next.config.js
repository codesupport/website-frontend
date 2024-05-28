/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true
	},
	transpilePackages: ["react-syntax-highlighter"]
};

export default config;
