import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Wrapper = styled("div")`
	display: grid;
	grid-template-columns: repeat(3, 350px);
	gap: var(--spacer);
	justify-content: space-between;
	
	@media (max-width: 1480px){
		justify-content: center;
		grid-template-columns: repeat(2, 350px);
		gap: calc(var(--spacer) * 3);
	}
	
	@media (max-width: 1200px){
		grid-template-columns: repeat(1, 1fr);
	}
`;

const Column = styled("article")`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	padding: 3rem;
	background-color: var(--foreground);
	box-shadow: var(--box-shadow);
	position: relative;
	border-radius: var(--border-radius);

	svg {
		height: 45px;
		color: var(--cs-blue);
		position: absolute;
		top: calc(-45px / 2); 
		right: calc(-45px / 2); 

		@media (max-width: 1200px){
			right: unset;
			left: calc(50% - calc(45px / 2));
			height: 45px;
		}
	}

	h5{
		margin: 0;
	}
`;

function Columns({ columns }) {
	return (
		<Wrapper>
			{columns.map(column => (
				<Column key={column.name}>
					<FontAwesomeIcon icon={column.icon} size="2x" />
					<h5 className="uk-margin-small" dangerouslySetInnerHTML={{__html: column.title}}></h5>
					<p className="uk-margin-small-top">{column.description}</p>
				</Column>
			))}
		</Wrapper>
	);
}

export default Columns;
