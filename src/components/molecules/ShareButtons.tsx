import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../atoms/Button";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const Wrapper = styled("div")`
	max-width: 500px;
	display: flex;
	gap: calc(var(--spacer));
	justify-content: space-evenly;
	margin: calc(var(--spacer) * 1.5) auto;
	padding: 0 calc(var(--spacer));
	text-align: center;
	
	a {
		line-height: 15px;
	}

	@media (max-width: 450px){
		flex-direction: column;
	}
`;

interface Link {
	title: string;
	url: string;
	icon: IconProp;
}

export interface ShareButtonsProps {
	links: Link[];
}

function ShareButtons({ links }: ShareButtonsProps) {
	return (
		<Wrapper>
			{links.map(link => (
				<Button
					key={link.title}
					target="_blank"
					link={link.url}
				>
					<FontAwesomeIcon icon={link.icon} /> Share on {link.title}
				</Button>
			))}
		</Wrapper>
	);
}

export default ShareButtons;
