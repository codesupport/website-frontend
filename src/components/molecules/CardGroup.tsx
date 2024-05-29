import styled from "styled-components";

const CardGroup = styled("div")<{width?: number}>`
    display: grid;
    grid-template-columns: repeat(${props => (props.width === undefined ? 2 : props.width)}, 1fr);
    gap: calc(var(--spacer) * 2);
    
    @media only screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
`;

export default CardGroup;
