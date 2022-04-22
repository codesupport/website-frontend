import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedPageTemplate from "../../components/templates/ProtectedPageTemplate";
import useAPI from "../../hooks/useAPI";

function Profile() {
	const { user } = useAuth0();
	const { loading, data, error } = useAPI("GET", "protected");

	return (
		<ProtectedPageTemplate>
		    <h1>{user?.name}'s Profile</h1>
			{loading && <p>Loading...</p>}
			{data && <p>{JSON.stringify(data)}</p>}
			{error && <p>{error}</p>}
		</ProtectedPageTemplate>
	);
}

export default Profile;