import React from "react";
import styled from "styled-components";
import { Label } from "../atoms/Label";

const Search = styled("input")`
	&& {
		width: 100%;
    }
`;

function SearchBar({ name, className, label, onChangeHandler }) {
	return (
		<Label>
			<span>{label}</span>
			<Search name={name} className={`${className } uk-input`} onChange={onChangeHandler}
				type="text" placeholder="Type something..."/>
		</Label>
	);
}

export default SearchBar;
