import React from "react";
import styled from "styled-components";
import PageTemplate from "../components/templates/PageTemplate";
import LoginForm from "../components/organisms/LoginForm";

const Wrapper = styled("div")`
	margin: 0 auto;
	padding-top: 50px;
	display: grid;
	place-items: center;
`;

function Login() {
	return (
		<PageTemplate page="Login">
			<Wrapper>
				<LoginForm />
			</Wrapper>
		</PageTemplate>
	);
}

export default Login;