import { getApps, initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";
import { getAnalytics } from "firebase/analytics";

let firebaseAnalytics;
let firebasePerformance;

if (typeof window !== "undefined" && !getApps().length) {
	const isLocal = location.hostname === "localhost";
	const isPreviewChannel = location.hostname.includes("web.app");
	let app;

	if (isLocal || isPreviewChannel) {
		app = initializeApp({
			apiKey: "AIzaSyBshIWr5s-dU8ugQTHKJstI4E5ZyLi_V6g",
			authDomain: "codesupport-development.firebaseapp.com",
			databaseURL: "https://codesupport-development.firebaseio.com",
			projectId: "codesupport-development",
			storageBucket: "codesupport-development.appspot.com",
			messagingSenderId: "751174037565",
			appId: "1:751174037565:web:a57acda7b2d688327e3a54",
			measurementId: "G-XHEJ625R85"
		});
	} else {
		app = initializeApp({
			apiKey: "AIzaSyBsZyamFTYt1iNsVISi5mWPGJAINEdrnwA",
			authDomain: "codesupport-production.firebaseapp.com",
			databaseURL: "https://codesupport-production.firebaseio.com",
			projectId: "codesupport-production",
			storageBucket: "codesupport-production.appspot.com",
			messagingSenderId: "300111604570",
			appId: "1:300111604570:web:20d21cc1e96b9ce8fe2163",
			measurementId: "G-TDQFPMY7DB"
		});
	}

	firebaseAnalytics = getAnalytics(app);
	firebasePerformance = getPerformance(app);
}

export const analytics = firebaseAnalytics;
export const performance = firebasePerformance;
