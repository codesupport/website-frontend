/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true
	},
	output: 'export',
	transpilePackages: ["react-syntax-highlighter"]
};

export default config;
