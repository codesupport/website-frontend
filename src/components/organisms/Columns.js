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
	svg {
		height: 30px;
		margin-top: 15px;
	}

	h3 {
		margin-top: 0;
		margin-bottom: 5px;
	}
`;

function Columns({ columns }) {
	return (
		<Wrapper>
			{columns.map(column => (
				<Column key={column.name}>
					<FontAwesomeIcon icon={column.icon} size="2x" />
					<h3 className="uk-margin-small">
						{column.title}
					</h3>
					<p className="uk-margin-small-top">
						{column.description}
					</p>
				</Column>
			))}
		</Wrapper>
	);
}

export default Columns;
