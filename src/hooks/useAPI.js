import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function useAPI(method, path, body) {
	const { getAccessTokenSilently } = useAuth0();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		(async () => {
			try {
				const token = await getAccessTokenSilently({
					audience: process.env.NEXT_PUBLIC_AUTH_AUDIENCE_URL
				});

				const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_AUDIENCE_URL}/${path}`, {
					method,
					body,
					headers: {
						Authorization: `Bearer ${token}`
					}
				});

				setData(await res.json());
				setLoading(false);
			} catch (error) {
				console.error(error);

				setError(error.message);
				setLoading(false);
			}
		})();
	}, []);

	return { loading, data, error };
}

export default useAPI;
