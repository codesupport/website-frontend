import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PageTemplate from "./PageTemplate";
import Link from "next/link";

const Wrapper = styled("section")`
	width: 600px;
	margin: 0 auto;
`;

const Links = styled("ul")`
	display: flex;
	justify-content: space-evenly;
	list-style: none;
	
	li { display: inline }
`;

const SESSION_STORAGE_KEY = "user_data";

const PageState = {
	LOADING: 0,
	NO_PERMISSION: 1,
	HAS_PERMISSION: 2
};

function ProtectedPageTemplate({ children, page, meta }) {
	const [visible, setVisible] = useState(PageState.LOADING);

	useEffect(() => {
		const loggedIn = sessionStorage.getItem(SESSION_STORAGE_KEY);

		if (loggedIn) return setVisible(PageState.HAS_PERMISSION);

		setVisible(PageState.NO_PERMISSION);
	}, []);

	/* eslint-disable indent */
	switch (visible) {
		case PageState.NO_PERMISSION: return (
			<PageTemplate page={page} meta={meta}>
				<Wrapper>
					<section className="uk-alert uk-alert-danger">
						<strong>Error:</strong> You do not have permission to view this page.
					</section>
					<Links>
						<li>
							<Link href="/">
								<a>Homepage</a>
							</Link>
						</li>
						<li>
							<Link href="/login">
								<a>Login</a>
							</Link>
						</li>
					</Links>
				</Wrapper>
			</PageTemplate>
		);
		case PageState.HAS_PERMISSION: return (
			<PageTemplate page={page} meta={meta}>
				{children}
			</PageTemplate>
		);
		case PageState.LOADING: return (
			<PageTemplate page={page} meta={meta}>
				<p>Loading...</p>
			</PageTemplate>
		);
	}
	/* eslint-enable indent */
}

export default ProtectedPageTemplate;