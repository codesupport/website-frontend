import PageTemplate from "../components/templates/PageTemplate";
import Container from "../components/templates/Container";
import Markdown from "../components/atoms/Markdown";

const privacyPolicy = `
Last Updated: September 2026

## What We Log
- Message content when messages are edited or deleted
- Who made the change (username and user ID)
- When it happened (timestamp)
- Where it happened (channel name)

## Why We Log This
We log messages only for moderation purposes to help keep the community a safe environment.

## Who Can See the Logs
Only moderators can view the logging channel.

## What We Don't Do

- We don't sell any data
- We don't message content outside of Discord
- We don't share any data with third parties
- We don't use data to train AI models
- We don't log private messages

## Questions
If you have questions about this policy, contact the CodeSupport Discord moderation team.
`;

function DiscordPrivacyPolicy() {
	return (
		<PageTemplate page="Discord Privacy Policy">
			<section>
				<Container>
					<h2>
						CodeSupport Discord Privacy Policy
					</h2>
					<Markdown content={privacyPolicy} />
				</Container>
			</section>
		</PageTemplate>
	);
}

export default DiscordPrivacyPolicy;
