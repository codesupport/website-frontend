import React, { createContext, useState, useEffect } from "react";
import { analytics } from "../services/FirebaseService";

const LOCAL_STORAGE_KEY = "auth";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
	const [user, setUser] = useState(undefined);

	// eslint-disable-next-line func-style
	const updateUser = update => {
		setUser(update);

		if (!update) {
			localStorage.removeItem(LOCAL_STORAGE_KEY);
		} else {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(update));
		}
	};

	useEffect(() => {
		if (!user) {
			analytics.setUserId(user?.id);

			setUser(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;