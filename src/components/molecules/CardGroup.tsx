import styled from "styled-components";

const CardGroup = styled("div")`
    display: grid;
    grid-template-columns: repeat(${(props: {width?: number}) => (props.width === undefined ? 2 : props.width)}, 1fr);
    gap: calc(var(--spacer) * 2);
    
    @media only screen and (max-width: 900px) {
      grid-template-columns: 1fr;
    }
`;

export default CardGroup;