export default (url, source) => {
	const parsedURL = new URL(url);

	parsedURL.searchParams.append("utm_content", "share");
	parsedURL.searchParams.append("utm_medium", "social");
	parsedURL.searchParams.append("utm_source", source);

	return parsedURL.toString();
};