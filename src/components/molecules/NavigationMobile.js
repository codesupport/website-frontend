import Link from "next/link";
import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const MobileBackdrop = styled.div`
	position:fixed;
	top:0;
	left:0;
	width: 100%;
	height: 100%;
	z-index:5;
	background-color: hsl(0 0% 0% / 0.5);
	display: none;

	&.open{
		display: block;
	}
`;

const MobileNavigationOpenAnimation = keyframes`
	from{
		right:-300px;
	}

	to{
		right:0;
	}
`;

const MobileNavigation = styled.div`
	width:80%;
	min-width:300px;
	max-width: 300px;
	z-index:6;
	background-color: var(--foreground);
	position:fixed;
	top:0;
	right:-300px;
	height: 100%;

	display: none;

	&.open{
		display: block;
		animation: ${MobileNavigationOpenAnimation} 200ms 1;
		animation-fill-mode: forwards;
	}

	.contents{
		max-height: 100%;
		overflow-y: auto;
		padding: var(--spacer);
	}
`;

const MobilePageLinks = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;

	a{
		display: flex;
		width: 100%;
		color: var(--text);
		text-decoration: none;
		padding: var(--spacer);

		&:active, &:focus, &:hover{
			background-color: hsl(0 0% 90%);
		}
	}
`;

const CloseMobileNavButton = styled.button`
	appearance: none;
	color: var(--text-light);
	border: none;
	background: none;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: calc(var(--spacer) / 2);
	margin-bottom: var(--spacer);

	&:hover{
		cursor: pointer;
	}
`;

const LogoContainer = styled.div`
	padding: var(--spacer) 0;
	text-align: center;
	border-bottom: 1px solid hsl(0 0% 70%);
	margin-bottom: var(--spacer);
`;

const Logo = styled.img`
	max-width: 100%;
	height: 75px;
`;

function NavigationMobile({mobileNavigationIsOpen, setMobileNavigationIsOpen}) {
	return (
		<>
			<MobileBackdrop className={mobileNavigationIsOpen ? "open" : ""} onClick={() => setMobileNavigationIsOpen(false)}></MobileBackdrop>
			<MobileNavigation className={mobileNavigationIsOpen ? "open" : ""}>
				<div className="contents">
					<CloseMobileNavButton type="button" onClick={() => setMobileNavigationIsOpen(false)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
							<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
						</svg>
						<span>Close</span>
					</CloseMobileNavButton>
					<LogoContainer>
						<Logo
							className="uk-navbar-item uk-logo"
							alt="CodeSupport Logo"
							src="/logo.png"
							draggable="false"
						/>
					</LogoContainer>
					<MobilePageLinks>
						<Link href="/" passHref>
							<a>Home</a>
						</Link>
						<Link href="/articles" passhref>
							<a>Articles</a>
						</Link>
						<Link href="/resources" passHref>
							<a>Resources</a>
						</Link>
					</MobilePageLinks>
				</div>
			</MobileNavigation>
		</>
	);
}

export default NavigationMobile;