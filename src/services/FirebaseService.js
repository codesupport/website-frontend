import firebase from "firebase/app";
import "firebase/performance";
import "firebase/analytics";

let firebaseAnalytics;
let firebasePerformance;

if (typeof window !== "undefined" && !firebase.apps.length) {
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

	firebaseAnalytics = firebase.analytics();
	firebasePerformance = firebase.performance();
}

export const analytics = firebaseAnalytics;
export const performance = firebasePerformance;
export default firebase;