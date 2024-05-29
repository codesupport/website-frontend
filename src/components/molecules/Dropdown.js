import React from "react";
import styled from "styled-components";
import { Label } from "../atoms/Label";

const Drop = styled("select")`
	&&&& {
		max-width: 100%;
    }
`;

function Dropdown({ name, className, label, value, onChangeHandler, children }) {
	return (
		<Label>
			<span>{label}</span>
			<Drop name={name} className={`${className } uk-select`} onChange={onChangeHandler} value={value}>
				{children}
			</Drop>
		</Label>
	);
}

export default Dropdown;
