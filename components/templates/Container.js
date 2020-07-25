import styled from "styled-components";

const Container = styled("div")`
    max-width: 1000px;
    margin: 0 auto;
    
    @media only screen and (max-width: 600px) {
        padding: 15px;
    }
`;

export default Container;