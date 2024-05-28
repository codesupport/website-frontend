import {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import styled from "styled-components";
import { Label } from "../atoms/Label";

const Drop = styled("select")`
	&&&& {
		max-width: 100%;
    }
`;

export type DropdownProps = PropsWithChildren<{
	name: string;
	className?: string;
	label?: string;
	value: string;
	onChangeHandler: ComponentPropsWithoutRef<typeof Drop>["onChange"];
}>;

function Dropdown({ name, className, label, value, onChangeHandler, children }: DropdownProps) {
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
