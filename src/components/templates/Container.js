import styled from "styled-components";

const Container = styled("div")`
    max-width: 1000px;
    margin: ${({margin}) => margin || 25}px auto;
    
    @media only screen and (max-width: 600px) {
        padding: 15px;
    }
`;

export default Container;