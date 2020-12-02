import React from "react";
import styled from "styled-components";

const Drop = styled("select")`
	&&&& {
		width: 100%;
		height: 25px;
    }
`;

function Dropdown({ className, label, value, onChangeHandler, children }) {
	return (
		<label>
			{label}
			<Drop className={`${className } uk-select`} onChange={onChangeHandler} value={value}>
				{children}
			</Drop>
		</label>
	);
}

export default Dropdown;