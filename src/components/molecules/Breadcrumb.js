import React from "react";
import styled from "styled-components";
import Link from "../atoms/Link";

const Wrapper = styled("div")`
	padding: 5px;
	background-color: #e8e8e8;
	border-radius: 5px;
	
	ul { margin: 0 }
`;

function Breadcrumb({ links }) {
	return (
		<Wrapper>
			<ul className="uk-breadcrumb">
				{links.map((link, i) => (
					<li key={i}>
						{link.link && <Link href="/cms">{link.text}</Link>}
						{!link.link && <span>{link.text}</span>}
					</li>
				))}
			</ul>
		</Wrapper>
	);
}

export default Breadcrumb;