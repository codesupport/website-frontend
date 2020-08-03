import React from "react";
import PageTemplate from "../components/templates/PageTemplate";
import IntroHero from "../components/molecules/IntroHero";
import Container from "../components/templates/Container";
import OpenSourceProjects from "../components/molecules/index/OpenSourceProjects";
import CommunityDiscord from "../components/molecules/index/CommunityDiscord";

function Home() {
	return (
		<PageTemplate page="Home">
			<IntroHero
				title="Welcome to CodeSupport!"
				description="CodeSupport is a community dedicated to giving guidance about programming, as well as creating conversation with one another. No matter your skill level, you are welcome in this community."
				button={{
					target: "_blank",
					href: "https://codesupport.dev/discord",
					text: "Join The Community"
				}}
			/>
			<main>
				<Container>
					<CommunityDiscord />
					<OpenSourceProjects />
				</Container>
			</main>
		</PageTemplate>
	);
}

export default Home;