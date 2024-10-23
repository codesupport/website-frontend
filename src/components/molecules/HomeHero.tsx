import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import Container from "../templates/Container";
import AnimatedChatBubble from "./index/AnimatedChatBubble";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";

const Hero = styled("header")`
	height: 55vh;
	min-height: 550px;
	padding-bottom: 100px;
	position: relative;

	@media (max-width: 1000px){
		height: unset;
	}

	.hero-container{
		display: flex;
		height: 100%;
		padding: calc(var(--spacer) * 2.5) calc(var(--spacer) * 2);

		@media (max-width: 1000px){
			flex-direction: column;
			align-items: center;
			gap: calc(var(--spacer) * 2.5);
		}
	}
	
	h1 {
		margin: 0;

		@media (max-width: 1000px){
			width: 100%;
			text-align: center;
		}
	}

	h1 span{
		color: var(--cs-blue);
	}
  
  	p {
		font-size: var(--fs-6);
  	}

	> svg{
		color: var(--foreground);
		position: absolute;
		bottom:-1px;
		left:0;
		height:125px;
		width: 100%;
		filter: drop-shadow( 0 -65px 16px hsl(214.72deg 79.9% 39.02% / 0.02));

		@media (prefers-color-scheme: dark) {
			filter: unset;
		}
	}
`;

const HeadingTextSection = styled("div")`
	max-width: 40%;
	min-width: 650px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 1rem;
	justify-content: center;

	@media (max-width:1200px){
		min-width:480px;
	}

	@media (max-width: 680px){
		max-width: unset;
		min-width: unset;
		text-align: center;

		a{
			width: 100%;
		}
	}
`;

const AnimatedChatBubbles = styled("div")`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 80px;
	gap: 1rem;
	justify-content: flex-end;
	position:relative;
	overflow: hidden;
	height: calc(80px * 3.85);

	@media (max-width: 1000px){
		margin-left: unset;
		width: 100%;
	}

	@media (max-width: 680px){
		display: none; 
	}
`;

export interface HomeHeroProps {
	title: string;
	description: string;
}

function HomeHero({title, description}: HomeHeroProps) {
	const chatBubblesContainerRef = useRef<HTMLDivElement>(null);

	// Begin the state with a single chat bubble and counter for modularity (even/odd)
	const [chatBubbles, setChatBubbles] = useState([<AnimatedChatBubble key={0} modularity="even"></AnimatedChatBubble>]);
	const [bubbleCounter, setBubbleCounter] = useState(1);

	useEffect(() => {
		const intervalId = setInterval(() => {
			// Only animate if the window is focused
			// This avoids weird flashing and sudden element transitions when returning to the tab/window
			// (But only if there aren't enough to fill the container)
			if (!document.hasFocus() && chatBubbles.length > 4) {
				return;
			}

			// Create a new array with the existing chat bubbles and one new one
			const newChatBubblesArray = [
				...chatBubbles,
				<AnimatedChatBubble key={bubbleCounter} modularity={bubbleCounter % 2 === 0 ? "even" : "odd"}></AnimatedChatBubble>
			];

			// Cut off the first element the array if there are 6 elements
			if (newChatBubblesArray.length > 5) {
				setChatBubbles(newChatBubblesArray.slice(1));
			} else {
				setChatBubbles(newChatBubblesArray);
			}

			setBubbleCounter(bubbleCounter + 1);
		}, 1750);

		return () => clearInterval(intervalId);
	}, [chatBubbles, bubbleCounter]);

	return (
		<Hero>
			<Container className="hero-container">
				<HeadingTextSection>
					<h1 dangerouslySetInnerHTML={{__html: title}}></h1>
					{description && (<p>
						{description}
					</p>)}
					<Button link="https://codesupport.dev/discord" target="_blank">
						<FontAwesomeIcon icon={faDiscord} />{" "}
						Join The Discord
					</Button>
				</HeadingTextSection>
				<AnimatedChatBubbles ref={chatBubblesContainerRef}>
					{chatBubbles}
				</AnimatedChatBubbles>
			</Container>
			<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 320">
				<path fill="currentColor" fillOpacity="1" d="M0,32L120,53.3C240,75,480,117,720,117.3C960,117,1200,75,1320,53.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
			</svg>
		</Hero>
	);
}

export default HomeHero;
