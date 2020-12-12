import firebase from "firebase/app";
import "firebase/performance";
import "firebase/analytics";

let firebaseAnalytics;
let firebasePerformance;

if (typeof window !== "undefined" && !firebase.apps.length) {
	if (location.hostname === "localhost" || location.hostname.includes("web.app")) {
		firebase.initializeApp({
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
		firebase.initializeApp({
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

	firebaseAnalytics = firebase.analytics();
	firebasePerformance = firebase.performance();
}

export const analytics = firebaseAnalytics;
export const performance = firebasePerformance;
export default firebase;