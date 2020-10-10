import React from "react";
import "../services/FirebaseService";
import "../../node_modules/uikit/dist/css/uikit.min.css";
import "../styles/hljs-theme.css";
import "../styles/style.css";

function App({ Component, pageProps }) {
	return (
		<Component {...pageProps} />
	);
}

export default App;