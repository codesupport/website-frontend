import styled from "styled-components";

export const Label = styled.label`
	display:flex;
	flex-direction: column;
	span{
		display: inline-block;
		text-transform: uppercase;
		font-size: calc(var(--body-font-size) - calc(var(--font-size-increment) * 1.15));
		letter-spacing: 0.055rem;
		margin-bottom:calc(var(--spacer) / 3);
	}
`;
