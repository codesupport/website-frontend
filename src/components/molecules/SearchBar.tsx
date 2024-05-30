import {ComponentPropsWithoutRef} from "react";
import styled from "styled-components";
import {Label} from "../atoms/Label";

const Search = styled("input")`
	&& {
		width: 100%;
	}
`;

export interface SearchBarProps {
	name: string;
	className?: string;
	label: string;
	onChangeHandler: ComponentPropsWithoutRef<typeof Search>["onChange"];
}

function SearchBar({ name, className, label, onChangeHandler }: SearchBarProps) {
	return (
		<Label>
			<span>{label}</span>
			<Search name={name} className={`${className } uk-input`} onChange={onChangeHandler}
				type="text" placeholder="Type something..."/>
		</Label>
	);
}

export default SearchBar;
