import URLCard from "../URLCard";
import CardGroup from "../CardGroup";
import styled from "styled-components";

const openSourceProjects = [
	{
		title: "Discord Bot",
		language: "TypeScript",
		description: "The community Discord bot powered by Discord.js.",
		repository: "https://github.com/codesupport/discord-bot"
	},
	{
		title: "Website",
		language: "JavaScript",
		description: "The frontend of the CodeSupport website written using the React user interface library.",
		repository: "https://github.com/codesupport/website-frontend"
	}
];

const OpenSourceProjectsWrapper = styled("section")`
	padding-bottom: calc(var(--spacer) + calc(var(--spacer-increment) * 10));
	.header-wrapper{
		text-align: center;
		padding: calc(var(--spacer) + calc(var(--spacer-increment) * 10)) 0;
	}
`;

function OpenSourceProjects() {
	return (
		<OpenSourceProjectsWrapper>
			<div className="header-wrapper">
				<h2>We Love Open Projects</h2>
				<p>
					At CodeSupport, we believe in building great projects together. Take a look at our open source projects below and start contributing!
				</p>
			</div>
			<CardGroup>
				{openSourceProjects.map(project =>
					<URLCard
						key={project.title}
						href={project.repository}
						target="_blank"
						rel="noopener noreferrer"
						title={project.title}
						tag={project.language}
						tagClass={`lang-${project.language.toLowerCase()}`}
						description={project.description}
					/>
				)}
			</CardGroup>
		</OpenSourceProjectsWrapper>
	);
}

export default OpenSourceProjects;
