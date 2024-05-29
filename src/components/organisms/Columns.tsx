import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const Wrapper = styled("div")`
	display: grid;
	grid-template-columns: repeat(3, 350px);
	gap: var(--spacer);
	justify-content: space-between;
	
	@media (max-width: 1200px){
		justify-content: center;
		grid-template-columns: repeat(2, 350px);
		gap: calc(var(--spacer) * 3);
	}
	
	@media (max-width: 1000px){
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

	.icon-wrapper{
		width: 45px;
		height: 45px;
		background-color: var(--cs-blue);
		top: calc(-45px / 2); 
		right: calc(-45px / 2); 
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		border-radius: 50%;
		z-index: 2;

		svg {
			height: 28px;
			width: 28px;
			color: white;

			@media (max-width: 1000px){
				width: 22px;
				height: 22px;
			}
		}

		@media (max-width: 1000px){
			right: unset;
			left: calc(50% - calc(38px / 2));
			width: 38px;
			height: 38px;
		}
	}

	h5{
		margin: 0;
	}
`;

interface SingleColumn {
	name: string;
	icon: IconProp;
	title: string;
	description: string;
}

export interface ColumnsProps {
	columns: SingleColumn[]
}

function Columns({ columns }: ColumnsProps) {
	return (
		<Wrapper>
			{columns.map(column => (
				<Column key={column.name}>
					<div className="icon-wrapper">
						<FontAwesomeIcon icon={column.icon} size="2x" />
					</div>
					<h5 className="uk-margin-small" dangerouslySetInnerHTML={{__html: column.title}}></h5>
					<p className="uk-margin-small-top">{column.description}</p>
				</Column>
			))}
		</Wrapper>
	);
}

export default Columns;
