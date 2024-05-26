import {ComponentPropsWithoutRef} from "react";
import styled from "styled-components";

const Search = styled("input")`
	&& {
		width: 100%;
		height: 25px;
    }
`;

export type SearchBarProps = {
	name: string;
	className?: string;
	label: string;
	onChangeHandler: ComponentPropsWithoutRef<typeof Search>["onchange"];
}

function SearchBar({ name, className, label, onChangeHandler }: SearchBarProps) {
	return (
		<label>
			{label}
			<Search name={name} className={`${className } uk-input`} onChange={onChangeHandler}
				type="text" placeholder="Type something..."/>
		</label>
	);
}

export default SearchBar;
