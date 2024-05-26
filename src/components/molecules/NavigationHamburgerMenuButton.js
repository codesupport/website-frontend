import React from "react";
import styled from "styled-components";
import NavigationMobile, { openMobileNavigation } from "./NavigationMobile";

const NavHamburgerMenuButton = styled("button")`
	appearance: none;
	border: none;
	color: var(--text);
	display: none;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: none;

	&:hover{
		cursor: pointer;
	}

	@media (max-width: 1200px){
		display: inline-flex;
	}

	svg{
		width: calc(var(--body-font-size) * 2);
		height: calc(var(--body-font-size) * 2);
	}
`;

function NavigationHamburgerMenuButton({setMobileNavigationIsOpen}) {
	return (
		<NavHamburgerMenuButton type="button" onClick={() => setMobileNavigationIsOpen(true)}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
			</svg>
		</NavHamburgerMenuButton>
	);
}

export default NavigationHamburgerMenuButton;
