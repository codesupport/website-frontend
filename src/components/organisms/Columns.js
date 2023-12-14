import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Wrapper = styled("div")`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: var(--gridGap);
	
	@media only screen and (max-width: 800px) {
		grid-template-columns: repeat(2, 1fr);
		
		article:last-child {
			margin-top: var(--gridGap);
		}
	}
	
	@media only screen and (max-width: 600px) {
		grid-template-columns: repeat(1, 1fr);
		article:first-child {
			margin-top: 0;
		}
		article {
			margin-top: var(--gridGap);
		}
	}
`;

const Column = styled("article")`
	text-align: center;
	border: 1px solid var(--border);
	border-radius: 5px;
	padding: 10px;
	background-color: var(--foreground);
	h2 {
		margin-top: 15px;
		margin-bottom: 5px;
	}
	svg {
		height: 100px;
		padding: 20px 0;
	}
`;

function Columns({ columns }) {
	return (
		<Wrapper>
			{columns.map(column => (
				<Column key={column.name}>
					<FontAwesomeIcon icon={column.icon} size="2x" />
					<h3 className="uk-margin-small">{column.title}</h3>
					<p className="uk-margin-small-top">{column.description}</p>
				</Column>
			))}
		</Wrapper>
	);
}

export default Columns;