import {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import ReactMarkdown from "react-markdown";
import darcula from "react-syntax-highlighter/dist/esm/styles/prism/darcula";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism";
import {type Element, type Text} from "hast";

export type CodeBlockProps = PropsWithChildren<{
	language: ComponentPropsWithoutRef<typeof SyntaxHighlighter>["language"];
	props?: Exclude<ComponentPropsWithoutRef<typeof SyntaxHighlighter>, "children" | "style" | "language">
}>;

function CodeBlock({children, language, props}: CodeBlockProps) {
	if (!children) return null;

	return (
		<SyntaxHighlighter
			children={String(children).replace(/\n$/, "")}
			style={darcula}
			language={language}
			{...props} />
	);
}

export interface MarkdownProps {
	content: string
}

function Markdown({content}: MarkdownProps) {
	return (
		<ReactMarkdown
			className="markdown-content"
			children={content
				.replace(/\\n/g, " \n ")
				.replace(/\\t/g, "    ")
				.replace(/\\"/g, "\"")
			}
			components={{
				h1: "h2",
				pre({node, className, children, ...props}) {
					const codeblocks = node?.children.filter((c): c is Element => c.type === "element" && c.tagName === "code") ?? [];

					return (
						<>
							{codeblocks.map((cb, i) => {
								const match = /language-(\w+)/.exec(cb.properties.className?.toString() || "");

								const x = cb.children
									.filter((c): c is Text => c.type === "text")
									.map(c => c.value);

								return <CodeBlock
									key={i}
									children={x}
									language={match?.[1] ?? "text"}
									{...props}
								/>;
							})}
						</>
					);
				},
				code({node, className, children, ...props}) {
					return (
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
