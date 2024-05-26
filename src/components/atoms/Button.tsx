import {ComponentPropsWithoutRef, PropsWithChildren} from "react";

type BaseButtonProps = {
	display?: "default" | "primary" | "secondary" | "danger" | "text" | "link";
};

type ButtonLinkProps = {
	link: string;
	target: ComponentPropsWithoutRef<"a">["target"];
	type?: never;
} & BaseButtonProps;

type ButtonButtonProps = {
	link?: never;
	target?: never;
	type: ComponentPropsWithoutRef<"button">["type"];
} & BaseButtonProps

export type ButtonProps = PropsWithChildren<ButtonLinkProps | ButtonButtonProps>;

function Button({ children, type, link, target, display } : ButtonProps) {
	return link ?
		<a className={`uk-button uk-button-${display ?? "secondary"}`} href={link} target={target}>
			{children}
		</a>
		:
		<button type={type} className={`uk-button uk-button-${display ?? "secondary"}`}>
			{children}
		</button>
	;
}

export default Button;
