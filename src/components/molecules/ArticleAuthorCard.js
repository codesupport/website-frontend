import React from "react";
import Card from "./Card";
import Link from "../atoms/Link";

function ArticleAuthorCard({ author }) {
	return (
		<Card
			center
			image={{
				url: author.avatar,
				alt: `${author.name}'s Avatar`
			}}
			title={author.name}
			description={author.bio}
		>
			<Link href={`/profile/${author.name}`} className="uk-button uk-button-text">
				View Profile
			</Link>
		</Card>
	);
}

export default ArticleAuthorCard;