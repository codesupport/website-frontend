import UserService from "../services/UserService";

const users = new UserService();

export async function getAllProfiles() {
	return users.getAllUsers();
}

export async function getProfileById(id) {
	return users.getUserById(id);
}