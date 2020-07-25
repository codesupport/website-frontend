import React from "react";
import styled from "styled-components";

const Group = styled("div")`
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-column-gap: var(--gridGap);
    grid-row-gap: var(--gridGap);
    
    @media only screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
`;

function CardGroup({width, children}) {
    width = width === undefined ? 2 : width;

    return (
        <Group width={width}>
            {children}
        </Group>
    );
}

export default CardGroup;