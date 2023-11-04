import styled from "styled-components";

export default styled("article")`
	max-width: 600px;
	margin: 0 auto;
	
	h1 {
		margin: 0;
	}
	
	h2 {
		margin: 12px 0 6px 0;
	}
	
	h3 {
		margin: 10px 0 6px 0;
	}
	
	h4 {
		margin: 8px 0 6px 0;
	}
	
	p {
		margin: 6px 0 6px 0;
	}
	
	img {
		margin: 0 auto;
        width: 100%;
		display: block;
		border-radius: 3px;
	}
	
	em {
		color: var(--text);
	}
	
	code {
		padding: 2px;
		font-family: "Courier New", monospace;
		font-size: 13px;
		color: var(--text);
	}
`;
