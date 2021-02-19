import React from "react";
import styled from "styled-components";

const Wrapper = styled("div")`
	label {
		width: 100%;
		display: block;
		font-weight: 700;
	}
`;

function FormLabel({ text, children }) {
	return (
		<Wrapper>
			<label className="uk-form-label">
				{text}
			</label>
			{children}
		</Wrapper>
	);
}

export default FormLabel;