import React from "react";
import URLCard from "../URLCard";
import CardGroup from "../CardGroup";

const openSourceProjects = [
	{
		title: "Discord Bot",
		language: "TypeScript",
		description: "The community Discord bot powered by Discord.js.",
		repository: "https://github.com/codesupport/discord-bot"
	},
	{
		title: "Website Frontend",
		language: "JavaScript",
		description: "The frontend of the CodeSupport website written using the React user interface library.",
		repository: "https://github.com/codesupport/website-frontend"
	},
	{
		title: "Website Backend",
		language: "Java",
		description: "CodeSupport's website backend API service which is powered by Spring Boot.",
		repository: "https://github.com/codesupport/website-backend"
	},
	{
		title: "Resources API",
		language: "JSON",
		description: "A simple repository containing various resources that the community recommends.",
		repository: "https://github.com/codesupport/resources-api"
	}
];

function OpenSourceProjects() {
	return (
		<section>
			<h2 className="uk-text-center">
                We Love Open Source
			</h2>
			<p className="uk-text-center">
                At CodeSupport, we believe in building great projects together. Take a look at our open source projects below and start contributing!
			</p>
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
					>
						<p className="uk-text-uppercase">GitHub Repository</p>
					</URLCard>
				)}
			</CardGroup>
		</section>
	);
}

export default OpenSourceProjects;