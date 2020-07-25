import React from "react";
import Link from "next/link";
import styled from "styled-components";

const NavList = styled("ul")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ImgLogo = styled("img")`
    height: 50px;
    padding: 20px !important;
`;

function Navigation() {
    return (
        <nav className="uk-navbar-container" data-uk-navbar>
            <div className="uk-navbar-left">
                <NavList className="uk-navbar-nav">
                    <Link href="/">
                        <ImgLogo
                            className="uk-navbar-item uk-logo"
                            alt="CodeSupport Logo"
                            src="/logo.png"
                            draggable="false"
                        />
                    </Link>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/resources">
                            <a>Resources</a>
                        </Link>
                    </li>
                </NavList>
            </div>
        </nav>
    );
}

export default Navigation;