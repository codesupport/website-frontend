import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../atoms/Button";

const Wrapper = styled("div")`
	max-width: 500px;
	margin: 25px auto;
	display: flex;
	justify-content: space-evenly;
	
	a {
		margin: 0 12.5px;
	}
`;

function ShareButtons({ links }) {
	return (
		<Wrapper>
			{links.map(link => (
				<Button
					key={link.title}
					type="link"
					target="_blank"
					link={link.url}
					display="text"
				>
					<FontAwesomeIcon icon={link.icon} /> Share on {link.title}
				</Button>
			))}
		</Wrapper>
	);
}

export default ShareButtons;