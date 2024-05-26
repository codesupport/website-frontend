class UserService {
	static BASE_URL = "user";

	static buildProfileRichResult(author: string) {
		return {
			"@context": "https://schema.org",
			"@type": "Person",
			"name": author
		};
	}
}

export default UserService;
