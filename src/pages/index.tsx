import PageTemplate from "../components/templates/PageTemplate";
import HomeHero from "../components/molecules/HomeHero";
import Container from "../components/templates/Container";
import OpenSourceProjects from "../components/molecules/index/OpenSourceProjects";
import WhyJoinCodeSupport from "../components/molecules/index/WhyJoinCodeSupport";

function Home() {
	return (
		<PageTemplate page="Home">
			<HomeHero
				title="Welcome to <span>CodeSupport</span>!"
				description="CodeSupport is a community dedicated to giving guidance about programming, as well as creating conversation with one another. No matter your skill level, you are welcome in this community."
			/>
			<main>
				<Container>
					<WhyJoinCodeSupport />
					<OpenSourceProjects />
				</Container>
			</main>
		</PageTemplate>
	);
}

export default Home;
