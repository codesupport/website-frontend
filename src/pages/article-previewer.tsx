import {ChangeEvent, Component} from "react";
import styled from "styled-components";
import Article from "../components/molecules/Article";
import Markdown from "../components/atoms/Markdown";
import PageTemplate from "../components/templates/PageTemplate";
import IntroHero from "../components/molecules/IntroHero";

const Layout = styled("div")`
	max-width: 1500px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 25px;
`;

const TextArea = styled("textarea")`
	width: 100%;
	height: 300px;
	resize: vertical;
	border: 1px solid var(--border);
`;

const Preview = styled(Article)`
	padding: 15px;
	word-break: break-all;
	border: 1px solid var(--border);
`;

const Output = styled("p")`
	font-family: "Courier New", sans-serif;
	word-break: break-all;
`;

class ArticlePreview extends Component {
	state = {
		input: "# My Article"
	};

	localStorageExists: boolean = false;

	handleEdit = (event: ChangeEvent<HTMLTextAreaElement>) => {
		this.setState({
			input: event.target.value
		});

		if (this.localStorageExists) {
			localStorage.setItem("article-previewer", JSON.stringify({
				input: event.target.value
			}));
		}
	};

	loadFromSaved = () => {
		if (!this.localStorageExists) {
			return alert("Could not load saved content: localStorage unavailable. Try editing the input first.");
		}

		const saved = localStorage.getItem("article-previewer");

		this.setState({
			input: JSON.parse(saved ?? "").input
		});
	};

	componentDidMount() {
		this.localStorageExists = typeof window !== "undefined";
	}

	componentDidUpdate() {
		this.localStorageExists = typeof window !== "undefined";
	}

	render() {
		const { input } = this.state;

		return (
			<PageTemplate page="Article Previewer">
				<IntroHero
					title="Article Previewer"
					description="Preview how your article will look before you submit it."
				/>
				<Layout>
					<section>
						<h2>Input</h2>
						<TextArea onChange={this.handleEdit} value={input} cols={50} />
						<button className="uk-button-secondary" onClick={this.loadFromSaved}>
							Load from saved
						</button>
						<h2>Output</h2>
						<Output>
							{JSON.stringify(input)}
						</Output>
					</section>
					<section>
						<h2>Preview</h2>
						<Preview className="uk-article">
							<Markdown content={input} />
						</Preview>
					</section>
				</Layout>
			</PageTemplate>
		);
	}
}

export default ArticlePreview;
