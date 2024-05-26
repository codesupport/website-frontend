import React from "react";
import styled from "styled-components";
import { faBoxes, faHeart, faUsers } from "@fortawesome/free-solid-svg-icons";
import Columns from "../../organisms/Columns";

const Wrapper = styled("section")`
	margin-bottom: var(--gridGap);

	.why-join-wrapper{
		text-align: center;
		padding:5rem 0;

		.question-wrapper{
			display:flex;
			align-items: center;

			.line{
				flex-grow: 1;
				height: 1px;
				background-color: hsl(0 0% 90%);
			}

			svg{
				padding:0 1.5rem;
				width: 7rem;
				height: 7rem;

				path:first-child{
					fill: var(--cs-blue);
				}

				path:nth-child(2){
					fill: currentColor;
				}
			}
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
				<div className="question-wrapper">
					<div className="line"></div>
					<svg xmlns="http://www.w3.org/2000/svg" className="bi bi-question-circle" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
						<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
					</svg>
					<div className="line"></div>
				</div>
				<h2>Why Join CodeSupport?</h2>
				<p>
					We asked our community what their favourite things about CodeSupport are, here's what they said:
				</p>
			</div>
			<Columns columns={reasons} />
		</Wrapper>
	);
}

export default WhyJoinCodeSupport;