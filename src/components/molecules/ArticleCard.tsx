import styled from "styled-components";
import URLCard from "./URLCard";

const ReadMore = styled.p`
  	color: var(--cs-blue);
	font-weight: bold;
`;

export type Article = {
	id: string;
	author: string;
	title: string;
	description: string;
	content: string;
	date: Date;
	created: Date;
	modified: Date;
	slug: string;
};

export type ArticleCardProps = {
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
			<ReadMore className="read-more-button" href={`/article/${article.slug}`}>Read Article</ReadMore>
		</URLCard>
	);
}

export default ArticleCard;