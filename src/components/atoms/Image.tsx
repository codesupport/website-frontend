import styled from "styled-components";

const Img = styled("img")`
	max-width: 100%;
	max-height: 100%;
	border-radius: 3px;
`;

export interface ImageProps {
	src: string;
	alt: string;
}

function Image({ src, alt }: ImageProps) {
	return (
		<Img src={src} alt={alt}/>
	);
}

export default Image;
