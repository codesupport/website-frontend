import React from "react";
import Link from "next/link";
import styled from "styled-components";

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
					<Link href="/" passHref>
						<Logo
							className="uk-navbar-item uk-logo"
							alt="CodeSupport Logo"
							src="/logo.png"
							draggable="false"
						/>
					</Link>
					<li>
						<Link href="/" passHref>
							<a>Home</a>
						</Link>
					</li>
					<li>
						<Link href="/articles" passhref>
							<a>Articles</a>
						</Link>
					</li>
					<li>
						<Link href="/resources" passHref>
							<a>Resources</a>
						</Link>
					</li>
				</NavList>
			</div>
		</Nav>
	);
}

export default Navigation;