import axios from "axios";
import { backendAPI, defaultError } from "../config.json";

class UserService {
	static BASE_URL = "user";

	async getCurrentUser() {
		try {
			const { data } = await axios.get(`${backendAPI}/${UserService.BASE_URL}/v1/current`);

			return data.response[0];
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}
}

export default UserService;