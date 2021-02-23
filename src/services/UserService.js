import axios from "axios";
import { backendAPI, defaultError } from "../config.json";

class UserService {
	static BASE_URL = "user";

	static buildProfileRichResult(profile) {
		let richResult = {
			"@context": "https://schema.org",
			"@type": "Person",
			"name": profile.alias,
			"url": `https://codesupport.dev/profile/${profile.alias.toLowerCase()}`
		};

		if (profile.jobTitle) {
			richResult = {
				...richResult,
				jobTitle: profile.jobTitle
			};
		}

		if (profile.jobCompany) {
			richResult = {
				...richResult,
				worksFor: {
					"@type": "Organization",
					"name": profile.jobCompany
				}
			};
		}

		if (profile.avatarLink) {
			richResult = {
				...richResult,
				"image": {
					"@type": "ImageObject",
					"url": profile.avatarLink
				}
			};
		}

		return richResult;
	}

	async getCurrentUser() {
		try {
			const { data } = await axios.get(`${backendAPI}/${UserService.BASE_URL}/v1/current`);

			return data.response[0];
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}

	async getAllUsers() {
		try {
			const { data } = await axios.get(`${backendAPI}/${UserService.BASE_URL}/v1/users`);

			return data.response;
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}

	async getUserById(id) {
		try {
			const { data } = await axios.get(`${backendAPI}/${UserService.BASE_URL}/v1/users/${id}`);

			return data.response[0];
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}

	async getAllProfiles() {
		try {
			const { data } = await axios.get(`${backendAPI}/${UserService.BASE_URL}/v1/profiles`);

			return data.response;
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}

	async getUserProfileById(id) {
		try {
			const { data } = await axios.get(`${backendAPI}/${UserService.BASE_URL}/v1/profiles/${id}`);

			return data.response[0];
		} catch ({ response }) {
			throw new Error(response?.data?.message ?? defaultError);
		}
	}
}

export default UserService;
