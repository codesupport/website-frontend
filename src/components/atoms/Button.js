import React from "react";
import styled from "styled-components";

const style = `
	margin: 0;
	padding: 13px 30px;
	border: 0;
	background-color: var(--cs-blue);
	color: var(--foreground);
	text-decoration: none;
	text-transform: uppercase;
    font-size: 13px;
	display: inline-block;
	
	:hover {
		background-color: var(--text);
	}
`;

const AnchorButton = styled("a")`${style}`;
const RealButton = styled("button")`${style}`;

function Button({ children, type, link, target, display }) {
	return link ?
		<AnchorButton className={`uk-button uk-button-${display ?? "secondary"}`} href={link} target={target}>
			{children}
		</AnchorButton>
		:
		<RealButton type={type} className={`uk-button uk-button-${display ?? "secondary"}`}>
			{children}
		</RealButton>
	;
}

export default Button;
