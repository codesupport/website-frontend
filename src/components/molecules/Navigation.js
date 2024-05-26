import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

const Nav = styled("nav")`
	height: var(--navigation-height);
	position: relative;
	display: grid;
	align-items: center;
	background-color: var(--foreground);
`;

const NavContent = styled("div")`
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  ul {
    display: flex;
    list-style: none;
    color: var(--text);
	margin: 0;
  }
`;

const NavItem = styled("li")`

	${({ $active }) => $active && `
		font-weight: 700;
		border-bottom: 2px solid var(--cs-blue);
	`}

	a {
		display: inline-flex;
		color: inherit;
		height: 100%;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		transition: all 125ms;
		padding:0 1rem;

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
				<div></div>
			</NavContent>
		</Nav>
	);
}

export default Navigation;
