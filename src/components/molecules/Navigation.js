import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Nav = styled("nav")`
	height: 75px;
	position: relative;
	background-color: var(--foreground);
	box-shadow: 0px 3px 6px rgb(0, 0, 0, 0.16);
`;

const NavContent = styled("div")`
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

		:hover {
			text-decoration: none;
			color: var(--cs-blue);
		}
	}
`;

const Logo = styled("img")`
	&& {
		padding: 12.5px;
		height: 50px;
		display: block;
	}
`;

const PageLinks = styled("ul")`
	display: flex;
	justify-content: center;
`;

const ProfileLinks = styled("ul")`
	margin-left: auto;
`;

function Navigation() {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
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
				<ProfileLinks>
					{isAuthenticated ? (
						<>
							<NavItem $active={activeTab === "profile"}>
								<Link href="/profile" passHref>
									<a>Profile</a>
								</Link>
							</NavItem>
							<NavItem>
								<a onClick={() => logout({ returnTo: window.location.origin })}>Log Out</a>
							</NavItem>
						</>
					) : (
						<NavItem>
							<a onClick={loginWithRedirect}>Login</a>
						</NavItem>
					)}
				</ProfileLinks>
			</NavContent>
		</Nav>
	);
}

export default Navigation;