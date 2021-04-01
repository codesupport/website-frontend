import React from "react";
import Link from "next/link";
import Card from "./Card";

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
			<Link href={`/profile/${author.name}`}>
				<a className="uk-button uk-button-text">View Profile</a>
			</Link>
		</Card>
	);
}

export default ArticleAuthorCard;