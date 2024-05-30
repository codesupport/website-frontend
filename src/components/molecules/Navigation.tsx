import { useRouter } from "next/router";
import Link from "next/link";
import NavigationHamburgerMenuButton from "./NavigationHamburgerMenuButton";
import styled from "styled-components";
import config from "../../config.json";

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

  .hamburger-menu-container{
    width:75px;
  }
`;

const NavItem = styled("li")<{$active: boolean | undefined}>`

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
		width:125px;

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
	padding: 0;
  @media (max-width: 1200px){
	  display: none !important;
	}
`;

export interface NavigationProps {
	setMobileNavigationIsOpen: (isOpen: boolean) => void;
}

function Navigation({setMobileNavigationIsOpen}: NavigationProps) {
	const router = useRouter();
	const currentUrlPath = router.pathname;

	return (
		<Nav>
			<NavContent>
				<Link href="/">
					<Logo
						className="uk-navbar-item uk-logo"
						alt="CodeSupport Logo"
						src="/logo.png"
						draggable="false"
					/>
				</Link>
				<PageLinks>
					{config.navigationLinks.map(navLink => (
						<NavItem key={navLink.href} $active={navLink.href === "/" ? currentUrlPath === "/" : navLink.activeNavigationTabStubs?.includes(currentUrlPath)}>
							<Link href={navLink.href}>
								{navLink.text}
							</Link>
						</NavItem>
					))}
				</PageLinks>
				<div className="hamburger-menu-container">
					<NavigationHamburgerMenuButton setMobileNavigationIsOpen={setMobileNavigationIsOpen}></NavigationHamburgerMenuButton>
				</div>
			</NavContent>
		</Nav>
	);
}

export default Navigation;
