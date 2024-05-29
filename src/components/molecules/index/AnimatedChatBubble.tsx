import styled, { keyframes, css } from "styled-components";

type Modularity = "even" | "odd";

const ChatMovementAnimation = keyframes`
	from{
		margin-bottom: -80px;
		opacity: 0;
	}

	to{
		margin-bottom: 0;
		opacity: 1;
	}
`;

const ChatBubbleAppearAnimation = keyframes`
	from { 
		transform: scale(0)
	}

	to{
		transform: scale(1);
	}
`;

// Container for a single chat
const Chat = styled("div")<{$modularity: Modularity}>`
		position: relative;
		width: calc(100% - 80px);
		display: flex;
		opacity: 0;
		animation-name: ${ChatMovementAnimation};
		animation-duration: 300ms;
		animation-iteration-count: 1;
		animation-timing-function: linear;
		animation-fill-mode: forwards;
		bottom: 0;
		height: 80px;
		min-height: 80px;
		
		${({$modularity}) => $modularity === "even" && css`
			left: 0;
			align-self: flex-start;
		`}

		${({$modularity}) => $modularity === "odd" && css`
			right: 0;
			align-self: flex-end;
		`}
	}
`;

// Circular avatar for a chat
const Avatar = styled("div")<{$modularity: Modularity}>`
	border-radius: 50%;
	width: 50px;
	height: 50px;
	
	${({$modularity}) => $modularity === "even" && css`
		background-color: var(--cs-blue);
	`}

	${({$modularity}) => $modularity === "odd" && css`
		order: 1;
		background-color:gray;
	`}

`;

// Message bubble itself for a chat
const Bubble = styled("div")<{$modularity: Modularity}>`
	flex-grow: 1;
	height: 50px;
	border-radius: 0.3rem;
	transform: scale(0);
	position: relative; 
	margin-top: -20px;
	
	animation-name: ${ChatBubbleAppearAnimation};
	animation-duration: 150ms;
	animation-delay: 150ms;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;

	${({$modularity}) => $modularity === "even" && css`
		background-color: var(--cs-blue);
		margin-left: 30px;
	`}

	${({$modularity}) => $modularity === "odd" && css`
		background-color: gray;
		margin-right: 30px;
	`}

	::before{
		position: absolute;
		
		top:28px;
		content: "";
		width:0;
		height:0;
		display: block;
		border-style: solid;
		border-width: 0 22px 22px 0;
		
		${({$modularity}) => $modularity === "even" && css`
			left: -10px;
			transform: rotate(90deg);
			border-color: transparent var(--cs-blue) transparent transparent;
		`}

		${({$modularity}) => $modularity === "odd" && css`
			right: -10px;
			transform: rotate(-180deg);
			border-color: transparent gray transparent transparent;
		`}
	}
`;

export interface AnimatedChatBubbleProps {
	modularity: Modularity;
}

function AnimatedChatBubble({modularity}: AnimatedChatBubbleProps) {
	return (
		<Chat $modularity={modularity}>
			<Avatar $modularity={modularity}></Avatar>
			<Bubble $modularity={modularity}></Bubble>
		</Chat>
	);
}

export default AnimatedChatBubble;
