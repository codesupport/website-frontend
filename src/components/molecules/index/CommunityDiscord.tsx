import styled from "styled-components";
import Button from "../../atoms/Button";
import Image from "../../atoms/Image";

const Wrapper = styled("section")`
	margin: 50px 0;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: var(--gridGap);
	
	@media only screen and (max-width: 600px) {
		margin: 25px 0;
		grid-template-columns: 1fr;
		grid-row-gap: var(--gridGap);
		text-align: center;
	}
`;

const Text = styled("div")`
	display: flex;
	align-items: center;
`;

function CommunityDiscord() {
	return (
		<>
			<Wrapper>
				<Text>
					<div>
						<h2>
							A friendly place to chat,<br /> learn and share.
						</h2>
						<p>
							Whether you&apos;re proficient in Java or just learning Python, we are here to help you make new friends and grow as a developer in our supportive community.
						</p>
						<Button link="https://codesupport.dev/discord" target="_blank">
							Join The Discord
						</Button>
					</div>
				</Text>
				<Image alt="Screenshot of the CodeSupport Discord" src="/discord.png" />
			</Wrapper>
		</>
	);
}

export default CommunityDiscord;
