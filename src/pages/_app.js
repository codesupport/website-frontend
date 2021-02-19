import React from "react";
import axios from "axios";
import "../services/FirebaseService";
import "../../node_modules/uikit/dist/css/uikit.min.css";
import "../styles/hljs-theme.css";
import "../styles/style.css";

if (typeof window !== "undefined") {
	axios.defaults.withCredentials = location.hostname === "localhost";
}

function App({ Component, pageProps }) {
	return (
		<Component {...pageProps} />
	);
}

export default App;