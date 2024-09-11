import styled from "styled-components";
import {ComponentPropsWithoutRef, PropsWithChildren} from "react";

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
	
	> svg {
	  width: 15px;
	}
	
	@media (prefers-color-scheme: dark) {
		color:white;
	}
`;

const AnchorButton = styled("a")`${style}`;
const RealButton = styled("button")`${style}`;

interface ButtonLinkProps {
	link: string;
	target: ComponentPropsWithoutRef<"a">["target"];
	type?: never;
}

interface ButtonButtonProps {
	link?: never;
	target?: never;
	type: ComponentPropsWithoutRef<"button">["type"];
}

export type ButtonProps = PropsWithChildren<ButtonLinkProps | ButtonButtonProps>;

function Button({ children, type, link, target }: ButtonProps) {
	return link ?
		<AnchorButton href={link} target={target}>
			{children}
		</AnchorButton>
		:
		<RealButton type={type}>
			{children}
		</RealButton>
	;
}

export default Button;
