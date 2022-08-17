import React from "react";
import { promises as fs } from "fs";
import styled from "styled-components";
import PageTemplate from "../../components/templates/PageTemplate";
import { getProfileById, getAllProfiles } from "../../lib/fetchProfiles";
import UserService from "../../services/UserService";
import Container from "../../components/templates/Container";
import CardGroup from "../../components/molecules/CardGroup";
import { getAllApprovedArticlesByUser } from "../../lib/fetchArticles";
import ArticleCard from "../../components/molecules/ArticleCard";
import IntroHero from "../../components/molecules/IntroHero";

const Wrapper = styled(Container)`
	margin: 0 auto;
`;

const Layout = styled("div")`
	margin-top: 25px;
	display: grid;
	grid-template-columns: 3fr 2fr;
	grid-column-gap: var(--gridGap);

	@media only screen and (max-width: 800px) {
		display: block;
	}
`;

const ArticleSection = styled("section")`
	@media only screen and (max-width: 800px) {
		margin-bottom: 20px;
	}
`;

const USERNAME_TO_ID_FILE = "./temp-username-to-id.json";

function ProfileViewer({ profileData, articles }) {
	return (
		<PageTemplate page={`${profileData.username}'s Profile`} meta={{
			schema: UserService.buildProfileRichResult(profileData)
		}}>
			<IntroHero title={`${profileData.username}'s Profile`} />
			<Wrapper>
				<Layout>
					<ArticleSection>
						<h2>Article Feed</h2>
						{!articles.length && <p>{profileData.username} has not published any articles yet.</p> }
						<CardGroup width="1">
							{articles && articles.map(article => <ArticleCard article={article} />)}
						</CardGroup>
					</ArticleSection>
					<div>
						<section>
							<h2>Showcase Projects</h2>
							<p>{profileData.username} has not published any showcase projects yet.</p>
						</section>
						<section>
							<h2>GitHub Repositories</h2>
							{profileData.githubUsername ? (
								<p>{profileData.username} has created any public GitHub repositories yet.</p>
							) : (
								<p>{profileData.username} has not connected their GitHub account yet.</p>
							)}
						</section>
					</div>
				</Layout>
			</Wrapper>
		</PageTemplate>
	);
}

export async function getStaticPaths() {
	const profiles = await getAllProfiles();

	const aliasToId = Object.assign({}, ...profiles.map(profile => ({
		[profile.username.toLowerCase()]: profile.id
	})));

	await fs.writeFile(USERNAME_TO_ID_FILE, JSON.stringify(aliasToId));

	return {
		paths: profiles.map(profile => ({
			params: {
				username: profile.username.toLowerCase()
			}
		})),
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const aliasToId = JSON.parse((await fs.readFile(USERNAME_TO_ID_FILE)).toString());
	const profileData = await getProfileById(aliasToId[params.username.toLowerCase()]);
	const articles = await getAllApprovedArticlesByUser(aliasToId[params.username.toLowerCase()]);

	return {
		props: { profileData, articles: articles.reverse() }
	};
}

export default ProfileViewer;