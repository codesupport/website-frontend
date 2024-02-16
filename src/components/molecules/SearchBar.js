import React from "react";
import styled from "styled-components";
import { Label } from "../atoms/Label";

const Search = styled("input")`
	background-color: var(--foreground);
	border-radius: 5px;
	border: 1px solid var(--border);

	&& {
		width: 100%;
		height: 25px;
    }
`;

function SearchBar({ name, className, label, onChangeHandler }) {
	return (
		<Label>
			{label}
			<Search name={name} className={`${className } uk-input`} onChange={onChangeHandler}
				type="text" placeholder="Type something..."/>
		</Label>
	);
}

export default SearchBar;
