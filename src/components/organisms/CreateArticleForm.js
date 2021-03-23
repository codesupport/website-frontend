import React, { Component } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "../atoms/Button";
import FormLabel from "../molecules/FormLabel";
import TextInput from "../atoms/TextInput";
import ArticleService from "../../services/ArticleService";

const Form = styled("form")`
	max-width: 600px;
	padding: var(--gridGap);
	background-color: var(--foreground);
	
	.uk-alert-danger {
		padding: 5px;
	}
	
	ul { margin: 0; }
	
	button[type=submit] {
		margin-top: 10px;
	}
`;

const Inputs = styled("div")`
	${({ $loading }) => $loading && "opacity: 50%;"}
`;

class CreateArticleForm extends Component {
	article = new ArticleService();
	state = {
		error: false,
		loading: false,
		inputs: {
			title: ""
		}
	};

	handleSubmit = async event => {
		event.preventDefault();

		this.setState({
			loading: true
		});

		try {
			const { title } = this.state.inputs;

			if ([title].includes("")) {
				this.setState({
					error: "You must supply a title for your article.",
					loading: false
				});
			}

			const data = await this.article.createArticle(title);
			const articleId = data.response[0].id;

			this.props.router.push(`/cms/article/${articleId}`);
		} catch ({ message }) {
			this.setState({
				error: message,
				loading: false
			});
		}
	}

	handleInputChange = ({ target }) => {
		this.setState(prev => ({
			inputs: {
				...prev.inputs,
				[target.name]: target.value
			}
		}));
	}

	render() {
		const { error, loading } = this.state;

		return (
			<Form className="uk-form-stacked" onSubmit={this.handleSubmit}>
				<h2>
					Create An Article
				</h2>
				{error && (
					<section className="uk-alert-danger">
						<strong>There was a problem creating the article:</strong>
						<ul>
							{error.split(",").map((e, i) => <li key={i}>{e}</li>)}
						</ul>
					</section>
				)}
				<Inputs $loading={loading}>
					<FormLabel>
						Title
						<TextInput
							disabled={loading}
							name="title"
							onChange={this.handleInputChange}
							placeholder="Introduction To Programming"
							required
							type="text"
						/>
					</FormLabel>
					<Button type="submit">
						Create Article
					</Button>
				</Inputs>
			</Form>
		);
	}
}

export default props => {
	const router = useRouter();

	return <CreateArticleForm {...props} router={router} />;
};