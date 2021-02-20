import React from "react";
import { promises as fs } from "fs";
import styled from "styled-components";
import PageTemplate from "../../components/templates/PageTemplate";
import { getProfileById, getAllProfiles } from "../../lib/fetchProfiles";
import UserService from "../../services/UserService";
import Container from "../../components/templates/Container";
import ProfileHeader from "../../components/organisms/ProfileHeader";

const Wrapper = styled(Container)`
	padding-top: 50px;
`;

const Layout = styled("div")`
	margin-top: 50px;
	display: grid;
	grid-template-columns: 3fr 2fr;
	grid-column-gap: var(--gridGap);
`;

const ALIAS_TO_ID_FILE = "./temp-alias-to-id.json";

function ProfileViewer({ data }) {
	return (
		<PageTemplate page={`${data.alias}'s Profile`} meta={{
			description: data.biography,
			schema: UserService.buildProfileRichResult(data)
		}}>
			<Wrapper>
				<ProfileHeader profile={data} />
				<Layout>
					<section>
						<h2>Article Feed</h2>
						<p>{data.alias} has not published any articles yet.</p>
					</section>
					<div>
						<section>
							<h2>Showcase Projects</h2>
							<p>{data.alias} has not published any showcase projects yet.</p>
						</section>
						<section>
							<h2>GitHub Repositories</h2>
							{data.githubUsername ? (
								<p>{data.alias} has created any public GitHub repositories yet.</p>
							) : (
								<p>{data.alias} has not connected their GitHub account yet.</p>
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
	const data = await getProfileById(aliasToId[params.alias.toLowerCase()]);

	return {
		props: { data }
	};
}

export default ProfileViewer;