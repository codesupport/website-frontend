import React from "react";
import styled from "styled-components";

const CardGroup = styled("div")`
    display: grid;
    grid-template-columns: repeat(${props => props.width === undefined ? 2 : props.width}, 1fr);
    grid-column-gap: var(--gridGap);
    grid-row-gap: var(--gridGap);
    
    @media only screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
`;

export default CardGroup;