import React from "react";

function Button({ children, type, link, target }) {
	return link ?
		<a className="uk-button uk-button-secondary" href={link} target={target}>
			{children}
		</a>
		:
		<button type={type} className="uk-button uk-button-secondary">
			{children}
		</button>
	;
}

export default Button;