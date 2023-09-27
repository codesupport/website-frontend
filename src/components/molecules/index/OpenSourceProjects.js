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
		title: "Website",
		language: "JavaScript",
		description: "The frontend of the CodeSupport website written using the React user interface library.",
		repository: "https://github.com/codesupport/website-frontend"
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
					</URLCard>
				)}
			</CardGroup>
		</section>
	);
}

export default OpenSourceProjects;
