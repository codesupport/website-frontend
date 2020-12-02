import React from "react";
import styled from "styled-components";

const Search = styled("input")`
	&& {
		width: 100%;
		height: 25px;
    }
`;

function SearchBar({className, label, onChangeHandler }) {
	return (
		<label>
			{label}
			<Search className={`${className } uk-input`} onChange={onChangeHandler}
				type="text" placeholder="Type something..."/>
		</label>
	);
}

export default SearchBar;