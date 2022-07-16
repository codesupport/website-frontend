import React from "react";
import { promises as fs } from "fs";
import { faRedditAlien, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { getArticleById, getAllArticles } from "../../lib/fetchArticles";
import PageTemplate from "../../components/templates/PageTemplate";
import Container from "../../components/templates/Container";
import Article from "../../components/molecules/Article";
import IntroHero from "../../components/molecules/IntroHero";
import Markdown from "../../components/atoms/Markdown";
import { ArticleService } from "../../services/ArticleService";
import Link from "next/link";
import ShareButtons from "../../components/molecules/ShareButtons";
import addUtmParams from "../../helpers/addUtmParams";
const PATH_TO_ID_FILE = "./temp-path-to-id.json";

function ArticlePreviewer({ data }) {
	const {
		title,
		description,
		user,
		content,
		created,
		slug
	} = data;

	const twitterURL = new URL("https://twitter.com/intent/tweet");

	twitterURL.searchParams.append("original_referer", "https://codesupport.dev");
	twitterURL.searchParams.append("related", "codesupportdev");
	twitterURL.searchParams.append("text", `Checkout "${title}" by ${user.username} on @codesupportdev\nhttps://codesupport.dev/article/${slug}`);

	return (
		<PageTemplate page={title} meta={{
			description: description,
			schema: ArticleService.buildArticleRichResult(data)
		}}>
			<IntroHero
				title={title}
				description={description}
			/>
			<Container>
				<Article className="uk-article">
					<p className="uk-article-meta">
						Written on {created} by
						{" "}
						<Link href={`/profile/${user.username.toLowerCase()}`}>
							<a>{user.username}</a>
						</Link>
					</p>
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
						url: addUtmParams(encodeURI(`http://www.reddit.com/submit?url=https://codesupport.dev/article/${slug}`), "reddit")
					}
				]} />
			</Container>
		</PageTemplate>
	);
}

export async function getStaticPaths() {
	const articles = await getAllArticles();
	const pathToId = Object.assign({}, ...articles.map(article => ({
		[article.slug]: article.id
	})));

	await fs.writeFile(PATH_TO_ID_FILE, JSON.stringify(pathToId));

	return {
		paths: articles.map(article => ({
			params: {
				path: article.slug
			}})
		),
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const pathToId = JSON.parse((await fs.readFile(PATH_TO_ID_FILE)).toString());
	const data = await getArticleById(pathToId[params.path]);

	return {
		props: { data }
	};
}

export default ArticlePreviewer;
