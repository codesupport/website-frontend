import React from "react";
import styled from "styled-components";
import Container from "../templates/Container";

const Hero = styled("header")`
	padding: 50px 0;
	background-color: var(--cs-blue);
	
	h1 {
		margin: 0;
		color: var(--foreground);
	}
  
  	p {
    	color: var(--foreground);
  	}
`;

function IntroHero({ title, description }) {
	return (
		<Hero>
			<Container>
				<h1>
					{title}
				</h1>
				{description && (<p>
					{description}
				</p>)}
			</Container>
		</Hero>
	);
}

export default IntroHero;