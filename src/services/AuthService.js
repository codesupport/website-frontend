import axios from "axios";
import {backendAPI, defaultError} from "../config.json";

class AuthService {
	static BASE_URL = "authenticate";

	async login(email, password) {
		try {
			const { data } = await axios.post(`${backendAPI}/${AuthService.BASE_URL}`, {
				email,
				password
			});

			return data;
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}
}

export default AuthService;