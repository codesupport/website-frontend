import React from "react";
import PageTemplate from "../components/templates/PageTemplate";
import LoginForm from "../components/organisms/LoginForm";

function Login() {
	return (
		<PageTemplate page="Login">
			<LoginForm />
		</PageTemplate>
	);
}

export default Login;