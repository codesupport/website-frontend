import axios from "axios";
import { backendAPI } from "../config.json";

class UserService {
	static BASE_URL = "user";

	async getCurrentUser() {
		try {
			const { data } = await axios.get(`${backendAPI}/${UserService.BASE_URL}/v1/current`);

			return data;
		} catch ({ message }) {
			console.error(message);
		}

		return {};
	}
}

export default UserService;