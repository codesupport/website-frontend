import React from "react";
import styled from "styled-components";
import Container from "../templates/Container";

const Hero = styled("header")`
	padding: calc(var(--spacer) * 8) var(--spacer) calc(var(--spacer) * 9) var(--spacer);
	background-color: var(--cs-blue);
	position: relative;
	overflow: hidden;
	
	h1 {
		margin: 0;
		color: var(--foreground);
	}
  
  	p {
    	color: var(--foreground);
  	}

	svg{
		color: var(--foreground);
		position: absolute;
		bottom:0;
		left:0;
		height:75px;
		width: 100%;
		filter: drop-shadow( 0 -5px 12px hsl(214.72deg 79.9% 39.02% / 0.1));
		line-height: 0;
		display: block;
	}

	@media (max-width:1200px){
		text-align: center;
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
			<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 320">
				<path fill="currentColor" fill-opacity="1" d="M0,32L120,53.3C240,75,480,117,720,117.3C960,117,1200,75,1320,53.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
			</svg>
		</Hero>
	);
}

export default IntroHero;