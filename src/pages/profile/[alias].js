import React from "react";
import { promises as fs } from "fs";
import styled from "styled-components";
import PageTemplate from "../../components/templates/PageTemplate";
import { getProfileById, getAllProfiles } from "../../lib/fetchProfiles";
import UserService from "../../services/UserService";
import Container from "../../components/templates/Container";
import ProfileHeader from "../../components/organisms/ProfileHeader";
import CardGroup from "../../components/molecules/CardGroup";
import URLCard from "../../components/molecules/URLCard";
import { getAllArticlesByUser, getAllPublishedArticlesByUser } from "../../lib/fetchArticles";

const Wrapper = styled(Container)`
	padding-top: 50px;
`;

const Layout = styled("div")`
	margin-top: 50px;
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

const ALIAS_TO_ID_FILE = "./temp-alias-to-id.json";

function ProfileViewer({ profileData, articles }) {
	return (
		<PageTemplate page={`${profileData.alias}'s Profile`} meta={{
			description: profileData.biography,
			schema: UserService.buildProfileRichResult(profileData)
		}}>
			<Wrapper>
				<ProfileHeader profile={profileData} />
				<Layout>
					<ArticleSection>
						<h2>Article Feed</h2>
						{ !articles.length && <p>{profileData.alias} has not published any articles yet.</p> }
						<CardGroup width="1">
							{articles && articles.map(article => <URLCard
								key={article.id}
								href={`/article/${article.path}`}
								title={article.title}
								description={article.revision?.description}
							>
								<p className="uk-text-small">
									{article.createdOn}
								</p>
								<p className="uk-text-uppercase">Read More</p>
							</URLCard>)}
						</CardGroup>
					</ArticleSection>
					<div>
						<section>
							<h2>Showcase Projects</h2>
							<p>{profileData.alias} has not published any showcase projects yet.</p>
						</section>
						<section>
							<h2>GitHub Repositories</h2>
							{profileData.githubUsername ? (
								<p>{profileData.alias} has created any public GitHub repositories yet.</p>
							) : (
								<p>{profileData.alias} has not connected their GitHub account yet.</p>
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
		[profile.alias.toLowerCase()]: profile.id
	})));

	await fs.writeFile(ALIAS_TO_ID_FILE, JSON.stringify(aliasToId));

	return {
		paths: profiles.map(profile => ({
			params: {
				alias: profile.alias.toLowerCase()
			}
		})),
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const aliasToId = JSON.parse((await fs.readFile(ALIAS_TO_ID_FILE)).toString());
	const profileData = await getProfileById(aliasToId[params.alias.toLowerCase()]);
	const articles = await getAllPublishedArticlesByUser(aliasToId[params.alias.toLowerCase()]);

	return {
		props: { profileData, articles: articles.reverse() }
	};
}

export default ProfileViewer;