import React from "react";
import styled from "styled-components";
import Card from "./Card";

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

const CardGroup = styled("div")`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: var(--gridGap);
    grid-row-gap: var(--gridGap);
    
    @media only screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
`;

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
                {openSourceProjects.map((project) => (
                    <Card
                        key={project.title}
                        title={project.title}
                        tag={project.language}
                        tagClass={`lang-${project.language.toLowerCase()}`}
                        description={project.description}
                    >
                        <a
                            className="uk-button uk-button-text uk-margin-right"
                            target="_blank"
                            href={project.repository}
                            rel="noopener noreferrer"
                        >
                            GitHub Repository
                        </a>
                    </Card>
                ))}
            </CardGroup>
        </section>
    );
}

export default OpenSourceProjects;