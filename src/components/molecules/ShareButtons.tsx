import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../atoms/Button";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const Wrapper = styled("div")`
	max-width: 500px;
	margin: 25px auto;
	display: flex;
	justify-content: space-evenly;
	
	a {
		margin: 0 12.5px;
		line-height: 15px;
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
