import axios from "axios";
import { backendAPI } from "../config.json";

class AuthService {
	static BASE_URL = "authenticate";

	async login(email, password) {
		try {
			const { data } = await axios.post(`${backendAPI}/${AuthService.BASE_URL}`, {
				email,
				password
			});

			return data;
		} catch ({ message }) {
			console.error(message);
		}

		return {};
	}
}

export default AuthService;