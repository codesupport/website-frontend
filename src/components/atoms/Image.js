import React from "react";
import styled from "styled-components";

const Img = styled("img")`
	max-width: 100%;
	max-height: 100%;
	border-radius: 3px;
`;

function Image({ src, alt }) {
	return (
		<Img src={src} alt={alt}/>
	);
}

export default Image;
