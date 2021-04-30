import React, { Component } from "react";
import styled from "styled-components";
import FormLabel from "../molecules/FormLabel";
import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";
import ArticleRevisionService from "../../services/ArticleRevisionService";

const Inputs = styled("div")`
	${({ $loading }) => $loading && "opacity: 50%;"}
`;

class EditArticleMetadata extends Component {
	revision = new ArticleRevisionService();
	state = {
		loading: false,
		error: false,
		inputs: {
			title: "",
			description: "",
			tags: ""
		}
	}

	handleSubmit = async event => {
		event.preventDefault();

		this.setState({
			loading: true
		});

		try {
			const { title, description, tags } = this.state.inputs;
			const articleData = this.props.article;

			if ([title, description, tags].includes("")) {
				this.setState({
					error: "You must supply a title, description and tags.",
					loading: false
				});
			}

			const revisionId = await this.revision.createArticleRevision(articleData.id, {
				content: articleData.revision?.content,
				description,
				tags
			});

			this.setState({
				error: false,
				loading: false
			});

			this.props.updateRevision({
				target: {
					value: revisionId
				}
			});
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

	componentDidMount(prevProps) {
		const { article, revision } = this.props;

		if (prevProps === this.props) return;

		this.setState({
			inputs: {
				title: article?.title,
				description: revision?.description,
				tags: revision?.tags
			}
		});
	}

	render() {
		const { error, loading, inputs } = this.state;

		return (
			<section>
				<form className="uk-form-stacked" onSubmit={this.handleSubmit}>
					{error && (
						<section className="uk-alert-danger">
							<strong>There was a problem saving your changes:</strong>
							<ul>
								{error.split(",").map((e, i) => <li key={i}>{e}</li>)}
							</ul>
						</section>
					)}
					<Inputs $loading={loading}>
						<FormLabel>
							Title
							<TextInput
								disabled={true}
								type="text"
								onChange={this.handleInputChange}
								value={inputs.title}
							/>
						</FormLabel>
						<FormLabel>
							Description
							<TextInput
								disabled={loading}
								type="text"
								name="description"
								onChange={this.handleInputChange}
								value={inputs.description}
							/>
						</FormLabel>
						<FormLabel>
							Tags
							<TextInput
								disabled={true}
								type="text"
								name="tags"
								onChange={this.handleInputChange}
								value={inputs.tags}
							/>
						</FormLabel>
						<br />
						<Button type="submit">
							Save
						</Button>
					</Inputs>
				</form>
			</section>
		);
	}
}

export default EditArticleMetadata;