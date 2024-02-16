import React from "react";
import "../services/FirebaseService";
import "../styles/style.css";

function App({ Component, pageProps }) {
	return (
		<Component {...pageProps} />
	);
}

export default App;
