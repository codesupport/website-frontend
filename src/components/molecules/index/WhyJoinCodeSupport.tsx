import styled from "styled-components";
import { faBoxes, faHeart, faUsers } from "@fortawesome/free-solid-svg-icons";
import Columns from "../../organisms/Columns";

const Wrapper = styled("section")`
	margin-bottom: var(--gridGap);

	.why-join-wrapper{
		text-align: center;
		padding:calc(var(--spacer) * 2) 0 calc(var(--spacer) * 6) 0;

		h2{
			margin-top: 0;
		}
	}
`;

const reasons = [
	{
		icon: faHeart,
		name: "passionate",
		title: "Responses from <span class=\"text-branding\">passionate</span> people.",
		description: "Receive prompt responses from proficient and qualified developers who are keen to help you."
	},
	{
		icon: faUsers,
		name: "like-minded",
		title: "A <span class=\"text-branding\">like-minded</span> and talented community.",
		description: "Discuss the latest developments and best practices with fellow enthusiasts, all motivated to improve their code."
	},
	{
		icon: faBoxes,
		name: "organised",
		title: "Simple, <span class=\"text-branding\">organised</span> and accessible.",
		description: "Easily find the support you need from understanding community members with no sign-up required."
	}
];

function WhyJoinCodeSupport() {
	return (
		<Wrapper>
			<div className="why-join-wrapper">
				<h2>Why Join CodeSupport?</h2>
				<p>
					We asked our community what their favourite things about CodeSupport are, here&apos;s what they said:
				</p>
			</div>
			<Columns columns={reasons} />
		</Wrapper>
	);
}

export default WhyJoinCodeSupport;
