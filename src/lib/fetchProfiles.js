import UserService from "../services/UserService";

const users = new UserService();

export async function getAllProfiles() {
	const profiles = await users.getAllProfiles();

	return profiles;
}

export async function getProfileById(id) {
	const user = await users.getUserById(id);
	const profile = await users.getUserProfileById(id);

	return {
		...user,
		...profile
	};
}