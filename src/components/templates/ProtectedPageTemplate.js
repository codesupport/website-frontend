import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import PageTemplate from "./PageTemplate";

const Wrapper = styled("div")`
	margin: 250px auto;
	text-align: center;

	button {
		font-family: "Open Sans", sans-serif;
		font-weight: 500;
		padding: 5px 15px;
		background: none;
		color: var(--cs-blue);
		border: 1px solid var(--cs-blue);
		border-radius: 5px;

		:hover {
			font-weight: 700;
			cursor: pointer;
			border: 2px solid var(--cs-blue);
		}
	}
`;

function ProtectedPageTemplate({ children, page, meta }) {
	const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

	if (isLoading) {
		return (
			<PageTemplate page={page} meta={meta}>
				<p>Loading...</p>
			</PageTemplate>
		);
	}

	if (isAuthenticated) {
		return (
			<PageTemplate page={page} meta={meta}>
				{children}
			</PageTemplate>
		);
	}

	return (
		<PageTemplate page={page} meta={meta}>
			<Wrapper>
				<p>You must be logged in to view this page.</p>
				<button type="button" onClick={loginWithRedirect}>
					Log In
				</button>
			</Wrapper>
		</PageTemplate>
	);
}

export default ProtectedPageTemplate;