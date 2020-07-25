import React from "react";
import styled from "styled-components";
import Container from "../templates/Container";

const Hero = styled("header")`
    height: 300px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
    background-color: var(--cs-blue);
    
    h1 {
        color: inherit;
    }
`;

function IntroHero({ title, description, button }) {
    return (
        <Hero>
            <Container>
                <h1>
                    {title}
                </h1>
                <p>
                    {description}
                </p>
                {button && (
                    <a
                        href={button.href}
                        target={button.target}
                        className="uk-button uk-button-secondary"
                    >
                        {button.text}
                    </a>
                )}
            </Container>
        </Hero>
    );
}

export default IntroHero;