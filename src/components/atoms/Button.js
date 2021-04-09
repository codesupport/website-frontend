import React from "react";

function Button({ children, type, link, target, display }) {
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