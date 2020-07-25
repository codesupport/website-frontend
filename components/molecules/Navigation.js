import React from "react";
import Link from "next/link";

function Navigation() {
	return (
		<nav className="uk-navbar-container" data-uk-navbar>
			<div className="uk-navbar-left">
				<ul className="uk-navbar-nav nav-logo">
					<li>
						<Link href="/">
							<a>Home</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;