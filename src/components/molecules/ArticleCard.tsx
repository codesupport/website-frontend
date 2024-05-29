import styled from "styled-components";
import URLCard from "./URLCard";

const ReadMore = styled("p")`
  	color: var(--cs-blue);
	font-weight: bold;
`;

export interface Article {
	id: string;
	author: string;
	title: string;
	description: string;
	content: string;
	date: string;
	created: Date;
	modified: Date;
	slug: string;
}

export interface ArticleCardProps {
	article: Article;
}

function ArticleCard({ article }: ArticleCardProps) {
	return (
		<URLCard
			key={article.slug}
			href={`/article/${article.slug}`}
			title={article.title}
			author={article.author}
			description={article.description}
			date={article.date}
		>
			<ReadMore className="read-more-button">Read Article</ReadMore>
		</URLCard>
	);
}

export default ArticleCard;
