import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

function CodeBlock({ language, value }) {
	if (!value) return null;

	return (
		<SyntaxHighlighter
			language={language}
			style={darcula}
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