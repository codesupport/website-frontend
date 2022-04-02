import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedPageTemplate from "../../components/templates/ProtectedPageTemplate";

function Profile() {
	const { user } = useAuth0();

	return (
		<ProtectedPageTemplate>
		    <h1>{user?.name}'s Profile</h1>
		</ProtectedPageTemplate>
	);
}

export default Profile;