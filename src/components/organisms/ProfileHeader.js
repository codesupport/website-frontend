import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";

const DEFAULT_AVATAR = "https://codesupport.dev/logo.png";

const Wrapper = styled("header")`
	display: grid;
	grid-template-columns: 250px 1fr;
	grid-column-gap: var(--gridGap);

	@media only screen and (max-width: 800px) {
		display: initial;
		text-align: center;
	}
`;

const Image = styled("img")`
	border-radius: 3px;

	@media only screen and (max-width: 800px) {
		width: 150px;
		display: block;
		margin: 50px auto 0 auto;
	}
`;

const Info = styled("div")`
	margin: var(--gridGap) 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	
	@media only screen and (max-width: 600px) {
		margin: 0;
	}
`;

const Alias = styled("h1")`
	margin-bottom: 10px;

	@media only screen and (max-width: 800px) {
		margin: 10px 0 -30px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

`;

const Label = styled("span")`
	margin-left: 5px;
	
	@media only screen and (max-width: 800px) {
		margin: 0;
	}
`;

const ConnectedAccounts = styled("ul")`
	margin: 0;
	padding: 0;
	list-style: none;
	
	li {
		margin-right: var(--gridGap);
		display: inline;
	}
`;

const Occupation = styled("p")`
	margin: 0;

	span {
		font-weight: 700;
	}
`;

function ProfileHeader({ profile }) {
	return (
		<Wrapper>
			<Image
				className="uk-shadow-large"
				src={profile.avatarLink ?? DEFAULT_AVATAR}
				alt={`${profile.alias}'s avatar`}
			/>
			<Info>
				<section id="details">
					<Alias>
						{profile.alias}
						{profile.role && (
							<Label className="uk-label uk-margin-small">
								{profile.role.label}
							</Label>
						)}
					</Alias>
					{profile.jobTitle && (
						<Occupation>
							<span>{profile.jobTitle}</span>
							{profile.jobCompany && ` at ${profile.jobCompany}`}
						</Occupation>
					)}
					<p>{profile.biography}</p>
				</section>
				<section id="accounts">
					<ConnectedAccounts>
						{profile.discordUsername && (
							<li>
								<FontAwesomeIcon icon={faDiscord} /> {profile.discordUsername}
							</li>
						)}
						{profile.githubUsername && (
							<li>
								<FontAwesomeIcon icon={faGithub} /> {profile.githubUsername}
							</li>
						)}
					</ConnectedAccounts>
				</section>
			</Info>
		</Wrapper>
	);
}

export default ProfileHeader;