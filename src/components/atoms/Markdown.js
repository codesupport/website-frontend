import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

function CodeBlock({ language, value }) {
	if (!value) return null;

	return (
		<SyntaxHighlighter
			language={language}
			style={materialDark}
		>
			{value}
		</SyntaxHighlighter>
	);
}

function Markdown({ content, highlight = true }) {
	return (
		<ReactMarkdown
			source={content}
			linkTarget="_blank"
			renderers={highlight ? {
				code: CodeBlock
			} : {}}
		/>
	);
}

export default Markdown;