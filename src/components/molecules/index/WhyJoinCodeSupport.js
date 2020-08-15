import React from "react";
import styled from "styled-components";
import { faBoxes, faHeart, faUsers } from "@fortawesome/free-solid-svg-icons";
import Columns from "../../organisms/Columns";

const Wrapper = styled("section")`
	margin-bottom: var(--gridGap);
`;

const reasons = [
	{
		icon: faHeart,
		title: "Responses from passionate people.",
		description: "Receive prompt responses from proficient and qualified developers who are keen to help you."
	},
	{
		icon: faUsers,
		title: "A like-minded and talented community.",
		description: "Discuss the latest developments and best practices with fellow enthusiasts, all motivated to improve their code."
	},
	{
		icon: faBoxes,
		title: "Simple, organised and accessible.",
		description: "Easily find the support you need from understanding community members with no sign-up required."
	}
];

function WhyJoinCodeSupport() {
	return (
		<Wrapper>
			<h2 className="uk-text-center">
				Why Join CodeSupport?
			</h2>
			<p className="uk-text-center uk-margin-medium-bottom">
				We asked our community what their favourite things about CodeSupport are, here's what they said:
			</p>
			<Columns columns={reasons} />
		</Wrapper>
	);
}

export default WhyJoinCodeSupport;