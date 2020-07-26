import React from "react";

function Card({ title, description, children, tag, tagClass }) {
	return (
		<article className="uk-card uk-card-default uk-card-small uk-card-body">
			{tag &&
                <span className={`uk-card-badge uk-label ${tagClass}`}>{tag}</span>
			}
			{title &&
                <h2 className="uk-card-title uk-margin-xlarge-right">
                	{title}
                </h2>
			}
			{description &&
                <p>
                	{description}
                </p>
			}
			{children}
		</article>
	);
}

export default Card;