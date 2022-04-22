import React from "react";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import "../services/FirebaseService";
import "../../node_modules/uikit/dist/css/uikit.min.css";
import "../styles/style.css";

axios.defaults.withCredentials = true;

function App({ Component, pageProps }) {
	return (
		<Auth0Provider
			domain={process.env.NEXT_PUBLIC_AUTH_DOMAIN}
			clientId={process.env.NEXT_PUBLIC_AUTH_CLIENT_ID}
			audience={process.env.NEXT_PUBLIC_AUTH_AUDIENCE_URL}
			redirectUri={process.env.NEXT_PUBLIC_BASE_URL}
			cacheLocation="localstorage"
		>
			<Component {...pageProps} />
		</Auth0Provider>
	);
}

export default App;