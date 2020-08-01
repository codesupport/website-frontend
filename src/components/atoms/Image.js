import React from "react";
import styled from "styled-components";

const Img = styled("img")`
	border-radius: 3px;
`;

function Image({ src, alt }) {
	return (
		<Img className="uk-shadow-large"
			src={src}
			alt={alt}
		/>
	);
}

export default Image;