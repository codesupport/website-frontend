import React from "react";
import styled from "styled-components";

const Img = styled("img")`
	width: 100%;
	box-shadow: 0 14px 25px rgba(0,0,0,0.16);
	border-radius: 3px;
`;

function Image({ src, alt }) {
	return (
		<Img src={src} alt={alt}/>
	);
}

export default Image;
