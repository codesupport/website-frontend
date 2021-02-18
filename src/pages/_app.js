import React from "react";
import "../services/FirebaseService";
import "../../node_modules/uikit/dist/css/uikit.min.css";
import "../styles/hljs-theme.css";
import "../styles/style.css";
import AuthProvider from "../context/AuthContext";

function App({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default App;