import React from "react";
import axios from "axios";
import "../services/FirebaseService";
import "../../node_modules/uikit/dist/css/uikit.min.css";
import "../styles/style.css";

axios.defaults.withCredentials = true;

function App({ Component, pageProps }) {
	return (
		<Component {...pageProps} />
	);
}

export default App;