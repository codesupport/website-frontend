import PageTemplate from "../components/templates/PageTemplate";
import Container from "../components/templates/Container";

const rules = [
	"Please ask detailed questions, instead of just saying \"my code doesn't work\" or \"can someone help me\". Help us to help you.",
	"Responses to your questions are not guaranteed. The people here offer their expertise on their own time and for free.",
	"Please refrain from DMing people, bumping questions, or pinging for questions outside of an established conversation.",
	"Be respectful; no personal attacks, sexism, homophobia, transphobia, racism, hate speech or other disruptive behaviour.",
	"Don't advertise. If you're not sure whether it would be considered advertising or not, ask a moderator.",
	"Stick to the correct channels. If you're unsure which channel to put your question in, you can ask #general which channel is best for your question.",
	"Don't ask for help with illegal or immoral tasks. Doing so not only risks your continued participation in this community but is in violation of Discord's TOS and can get your account banned.",
	"No spoon-feeding, it's not useful and won't help anyone learn.",
	"Please use codeblocks when sending your code. Type ?codeblock if you don't know how.",
	"Keep it appropriate, some people use this at school or at work.\n"
];

function DiscordRules() {
	return (
		<PageTemplate page="Discord Rules">
			<section>
				<Container>
					<h2>
						CodeSupport Discord Rules
					</h2>
					<ol>
						{rules.map((rule, i) => <li key={i}>{rule}</li>)}
					</ol>
					<p className="uk-text-light uk-text-small">
						Last updated Saturday 1 August 2020
					</p>
				</Container>
			</section>
		</PageTemplate>
	);
}

export default DiscordRules;
