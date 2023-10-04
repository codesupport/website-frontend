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
}

export default UserService;
