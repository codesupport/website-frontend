import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

function CodeBlock({ children, language, props }) {
	if (!children) return null;

	return (
		<SyntaxHighlighter
			children={String(children).replace(/\n$/, '')}
			style={darcula}
			language={language}
			{...props}
	  />
	);
}

function Markdown({ content, highlight = true }) {
	return (
		<ReactMarkdown
			children={content}
			linkTarget="_blank"
			components={{
				code({node, inline, className, children, ...props}) {
				  const match = /language-(\w+)/.exec(className || '')
					return !inline && match ? (
						<CodeBlock
							children={children}
							language={match[1]}
							{...props}
						/>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					)
				}
			  }}
		/>
	);
}

export default Markdown;