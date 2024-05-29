import {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export type CodeBlockProps = PropsWithChildren<{
	language: ComponentPropsWithoutRef<typeof SyntaxHighlighter>["language"];
	props?: Exclude<ComponentPropsWithoutRef<typeof SyntaxHighlighter>, "children" | "style" | "language">
}>;

function CodeBlock({ children, language, props }: CodeBlockProps) {
	if (!children) return null;

	return (
		<SyntaxHighlighter
			children={String(children).replace(/\n$/, "")}
			style={darcula}
			language={language}
			{...props}
		/>
	);
}

export interface MarkdownProps {
	content: string
}

function Markdown({ content }: MarkdownProps) {
	return (
		<ReactMarkdown
			className="markdown-content"
			children={content
				.replace(/\\n/g, " \n ")
				.replace(/\\t/g, "    ")
				.replace(/\\"/g, "\"")
			}
			linkTarget="_blank"
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "");

					return !inline ? (
						<CodeBlock
							children={children}
							language={match?.[1] ?? "text"}
							{...props}
						/>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					);
				}
			}}
		/>
	);
}

export default Markdown;
