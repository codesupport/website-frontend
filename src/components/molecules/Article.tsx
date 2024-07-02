import styled from "styled-components";

export default styled("article")`
	max-width: var(--article-max-width);
	margin: var(--spacer) auto;
	padding: calc(var(--spacer) * 2.5);
	background-color: var(--foreground);
	box-shadow: var(--box-shadow);
	border-radius: var(--border-radius);

	h1:first-of-type{
		margin: 0;
	}

	img {
		margin: 0 auto;
        max-width: 100%;
		display: block;
		border-radius: 3px;
	}
	
	code {
		padding: 2px;
		font-family: "Courier New", monospace;
		font-size: 13px;
		color: var(--text);
	}

	.markdown-content{
		p{
			color: var(--article-body-text-color);
			font-weight: var(--article-body-font-weight);
		}

		blockquote{
			background-color: var(--background);
			margin: 0;
			padding: calc(var(--spacer) / 4) var(--spacer);
			
			& > :first-child{
				border-left: 1px solid hsl(0 0% 75%);
				padding-left: var(--spacer);
			}
		}

		pre{
			border-radius: var(--border-radius);
			overflow: hidden;
			pre{
			}
		}

		ul, ol{
			li{
				color: var(--article-body-text-color);
				font-weight: var(--article-body-font-weight);
			}
		}
	}
`;
