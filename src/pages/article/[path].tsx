import { faRedditAlien, faTwitter } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import { getAllArticles, getArticleBySlug } from "../../lib/fetchArticles";
import PageTemplate from "../../components/templates/PageTemplate";
import Container from "../../components/templates/Container";
import Article from "../../components/molecules/Article";
import { type Article as ArticleType } from "../../components/molecules/ArticleCard";
import Markdown from "../../components/atoms/Markdown";
import { ArticleService } from "../../services/ArticleService";
import ShareButtons from "../../components/molecules/ShareButtons";
import addUtmParams from "../../helpers/addUtmParams";
import { generateArticlePreviewImage } from "../../lib/generateArticlePreviewImage";
import {GetStaticPropsContext} from "next";

const ArticleMeta = styled("p")`
	color: var(--article-meta-text-color);
	font-size: calc(var(--body-font-size) * 0.85);
	margin-bottom: calc(var(--spacer) * 2);
	margin-top: calc(var(--spacer) / 4);
`;

export interface ArticlePreviewerProps {
	data: ArticleType;
}

function ArticlePreviewer({ data }: ArticlePreviewerProps) {
	const {
		title,
		description,
		author,
		content,
		date,
		slug
	} = data;

	const twitterURL = new URL("https://twitter.com/intent/tweet");

	twitterURL.searchParams.append("original_referer", "https://codesupport.dev");
	twitterURL.searchParams.append("related", "codesupportdev");
	twitterURL.searchParams.append("text", `Checkout "${title}" by ${author} on @codesupportdev\nhttps://codesupport.dev/article/${slug}`);

	return (
		<PageTemplate page={title} meta={{
			description: description,
			image: `https://codesupport.dev/article-assets/${slug}/meta-image.jpeg`,
			schema: ArticleService.buildArticleRichResult(data)
		}}>
			<Container>
				<Article className="uk-article">
					<h1>{title}</h1>
					<ArticleMeta>
						By {author} on {new Date(date).toDateString()}
					</ArticleMeta>
					<Markdown content={content} />
				</Article>
				<ShareButtons links={[
					{
						icon: faTwitter,
						title: "Twitter",
						url: addUtmParams(twitterURL.toString(), "twitter")
					},
					{
						icon: faRedditAlien,
						title: "Reddit",
						url: addUtmParams(encodeURI(`https://www.reddit.com/submit?url=https://codesupport.dev/article/${slug}`), "reddit")
					}
				]} />
			</Container>
		</PageTemplate>
	);
}

export async function getStaticPaths() {
	const articles = getAllArticles();

	return {
		paths: articles.map(article => ({
			params: {
				path: article.slug
			}})
		),
		fallback: false
	};
}

export async function getStaticProps({ params }: GetStaticPropsContext<{path: string}>) {
	const data = getArticleBySlug(params?.path ?? "");

	await generateArticlePreviewImage(data, params?.path ?? "");

	return {
		props: { data }
	};
}

export default ArticlePreviewer;
