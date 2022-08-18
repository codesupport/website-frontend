import axios from "axios";
import { backendAPI, defaultError } from "../config.json";

class UserService {
	static BASE_URL = "user";

	static buildProfileRichResult(profile) {
		return {
			"@context": "https://schema.org",
			"@type": "Person",
			"name": profile.username,
			"url": `https://codesupport.dev/profile/${profile.username.toLowerCase()}`
		};
	}

	async getAllUsers() {
		try {
			const { data } = await axios.get(`${backendAPI}/${UserService.BASE_URL}`);

			return data;
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}

	async getUserById(id) {
		try {
			const { data } = await axios.get(`${backendAPI}/${UserService.BASE_URL}/${id}`);

			return data;
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}
}

export default UserService;
