import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

const Nav = styled("nav")`
	height: 75px;
	position: relative;
	display: grid;
	align-items: center;
	background-color: var(--foreground);
	box-shadow: 0px 3px 6px rgb(0, 0, 0, 0.16);
`;

const NavContent = styled("div")`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 4fr 2fr;

  ul {
    display: flex;
    list-style: none;
    color: var(--text);
  }
`;

const NavItem = styled("li")`
	margin: auto 0;
	padding: 0 12.5px;
	font-family: "Open Sans", sans-serif;
	font-weight: 500;
	font-size: 13px;

	${({ $active }) => $active && `
		font-weight: 700;
		border-bottom: 2px solid var(--cs-blue);
	`}

	a {
		color: inherit;
		text-decoration: none;

		:hover {
			color: var(--cs-blue);
			text-decoration: none;
		}
	}
`;

const Logo = styled("img")`
	&& {
		padding: 12.5px;
		height: 75px;
		display: block;
	}
`;

const PageLinks = styled("ul")`
	display: flex;
	justify-content: center;
`;

function Navigation() {
	const router = useRouter();

	const activeTab = router.pathname.replace("/", "").split("/")[0];

	return (
		<Nav>
			<NavContent>
				<Link href="/" passHref>
					<Logo
						className="uk-navbar-item uk-logo"
						alt="CodeSupport Logo"
						src="/logo.png"
						draggable="false"
					/>
				</Link>
				<PageLinks>
					<NavItem $active={activeTab === ""}>
						<Link href="/" passHref>
							<a>Home</a>
						</Link>
					</NavItem>
					<NavItem $active={["articles", "article"].includes(activeTab)}>
						<Link href="/articles" passhref>
							<a>Articles</a>
						</Link>
					</NavItem>
					<NavItem $active={["resources", "resource"].includes(activeTab)}>
						<Link href="/resources" passHref>
							<a>Resources</a>
						</Link>
					</NavItem>
				</PageLinks>
			</NavContent>
		</Nav>
	);
}

export default Navigation;
