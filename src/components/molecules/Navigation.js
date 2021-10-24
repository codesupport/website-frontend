import React from "react";
import styled from "styled-components";
import Link from "../atoms/Link";

const Nav = styled("nav")`
	width: 100%;
	top: 0;
	position: absolute;
`;

const NavList = styled("ul")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Logo = styled("img")`
	object-fit: contain;
	cursor: pointer;
	
	&& {
		height: 50px;
		padding: 20px;
    }
`;

function Navigation() {
	return (
		<Nav className="uk-navbar-container uk-box-shadow-large" data-uk-navbar>
			<div className="uk-navbar-left">
				<NavList className="uk-navbar-nav">
					<Link href="/">
						<Logo
							className="uk-navbar-item uk-logo"
							alt="CodeSupport Logo"
							src="/logo.png"
							draggable="false"
						/>
					</Link>
					<li>
						<Link href="/">
							Home
						</Link>
					</li>
					<li>
						<Link href="/articles">
							Articles
						</Link>
					</li>
					<li>
						<Link href="/resources">
							Resources
						</Link>
					</li>
				</NavList>
			</div>
		</Nav>
	);
}

export default Navigation;