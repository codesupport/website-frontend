import {type NextRouter} from "next/router";

export default (router: NextRouter) => {
	const params: Record<string, string> = {};

	router.asPath
		.replace(router.pathname, "")
		.replace("?", "")
		.split("&")
		.forEach(pair => {
			const parts = pair.split("=");

			params[parts[0]] = parts[1];
		});

	return params;
};
