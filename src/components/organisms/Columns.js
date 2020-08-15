import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

const Wrapper = styled("div")`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: var(--gridGap);
	
	@media only screen and (max-width: 800px) {
		grid-template-columns: repeat(2, 1fr);
		
		article:last-child {
			display: none;
		}
	}
	
	@media only screen and (max-width: 600px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

const Column = styled("article")`
	h2 {
		margin-top: 15px;
		margin-bottom: 5px;
	}
`;

function Columns({ columns }) {
	return (
		<Wrapper>
			{columns.map(column => (
				<Column key={column.name}>
					<FontAwesomeIcon icon={column.icon} size="2x" />
					<h2>
						{column.title}
					</h2>
					<p className="uk-margin-small-top">
						{column.description}
					</p>
				</Column>
			))}
		</Wrapper>
	);
}

export default Columns;