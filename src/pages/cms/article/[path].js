import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import UIkit from "uikit";
import Article from "../../../components/molecules/Article";
import Markdown from "../../../components/atoms/Markdown";
import ProtectedPageTemplate from "../../../components/templates/ProtectedPageTemplate";
import Container from "../../../components/templates/Container";
import ImageManager from "../../../components/organisms/ImageManager";
import Button from "../../../components/atoms/Button";
import ArticleService from "../../../services/ArticleService";
import EditArticleMetadata from "../../../components/organisms/EditArticleMetadata";
import Breadcrumb from "../../../components/molecules/Breadcrumb";
import ArticleRevisionService from "../../../services/ArticleRevisionService";

const Layout = styled("div")`
	margin: 0 auto;
	display: grid;
	grid-template-columns: auto 275px;
	grid-column-gap: 25px;
`;

const PublishText = styled("p")`
	margin: 5px 0;
	font-size: .75rem;
`;

const TextArea = styled("textarea")`
	width: 100%;
	height: 300px;
	resize: vertical;
	border: 1px solid var(--border);
`;

const Preview = styled(Article)`
	padding: 15px;
	border: 1px solid var(--border);
`;

const PreviewTab = {
	CONTENT: 0,
	PREVIEW: 1,
	METADATA: 2
};

class ManageArticle extends Component {
	articleService = new ArticleService();
	revisionService = new ArticleRevisionService();
	state = {
		loading: true,
		success: undefined,
		error: undefined,
		activeTab: PreviewTab.CONTENT,
		activeRevision: undefined,
		content: "",
		articleData: {},
		revisionsData: []
	};

	saveContent = async event => {
		const { articleData, content } = this.state;

		event.preventDefault();

		try {
			const revisionId = await this.revisionService.createArticleRevision(articleData.id, {
				content,
				description: articleData.revision?.description ?? "Not set",
				tags: articleData.revision?.tags
			});

			this.setRevisionData({
				target: {
					value: revisionId
				}
			});

			this.setState({
				success: `Created and saved new revision (Revision ID: ${revisionId})`
			});

			setTimeout(() => this.setState({ success: undefined }), 3000);
		} catch ({ message }) {
			this.setState({
				error: message
			});
		}
	}

	setContent = event => {
		this.setState({
			content: event.target.value
		});
	}

	setRevisionData = event => {
		const revisionId = +event.target.value;
		const { revisionsData } = this.state;

		const activeRevision = revisionsData.find(revision => revision.id === revisionId);

		if (!activeRevision) {
			return this.getData(revisionId);
		}

		this.setState({
			activeRevision,
			content: activeRevision.content
		});
	}

	setActiveTab = tab => {
		this.setState({
			activeTab: tab
		});
	}

	getData = async revisionId => {
		const articleId = +window.location.pathname.replace("/cms/article/", "");

		try {
			this.setState({
				loading: true,
				error: undefined
			});

			const articleData = await this.articleService.getArticleById(articleId);
			const revisionsData = await this.articleService.getArticleRevisions(articleId);
			const activeRevision = revisionsData.find(revision => revision.id === revisionId) ?? articleData.revision;

			this.setState({
				articleData,
				revisionsData,
				activeRevision,
				content: activeRevision?.content ?? `
WARNING - NO ACTIVE REVISION SET
Select one via the dropdown to the right or create a new one by pressing "save".
				`.trim(),
				error: undefined,
				loading: false
			});
		} catch ({ message }) {
			this.setState({
				loading: false,
				error: message
			});
		}
	}

	componentDidMount() {
		this.getData();
	}

	render() {
		const { error, success, activeTab, content, articleData, revisionsData, activeRevision } = this.state;

		return (
			<ProtectedPageTemplate page="Manage Article">
				<Container>
					<Breadcrumb links={[
						{ text: "CMS", link: "cms" },
						{ text: "Manage Articles" }
					]} />
					{error && (
						<section className="uk-alert uk-alert-danger">
							<strong>Error:</strong> {error}
						</section>
					)}
					{success && (
						<section className="uk-alert uk-alert-success">
							<strong>Success:</strong> {success}
						</section>
					)}
					<h1>Manage Article</h1>
					<Layout>
						<main>
							<h2>Editor</h2>
							<ul data-uk-tab>
								<li
									onClick={() => this.setActiveTab(PreviewTab.CONTENT)}
									className={activeTab === PreviewTab.CONTENT && "uk-active"}
								>
									<a>
										Content
									</a>
								</li>
								<li
									onClick={() => this.setActiveTab(PreviewTab.PREVIEW)}
									className={activeTab === PreviewTab.PREVIEW && "uk-active"}
								>
									<a>
										Preview
									</a>
								</li>
								<li
									onClick={() => this.setActiveTab(PreviewTab.METADATA)}
									className={activeTab === PreviewTab.METADATA && "uk-active"}
								>
									<a>
										Metadata
									</a>
								</li>
							</ul>
							{activeTab === PreviewTab.CONTENT && (
								<section>
									<form onSubmit={this.saveContent}>
										<TextArea onChange={this.setContent} value={content} cols={50} />
										<Button type="submit">
											Save
										</Button>
									</form>
								</section>
							)}
							{activeTab === PreviewTab.PREVIEW && (
								<section>
									<Preview className="uk-article">
										<Markdown content={content} />
									</Preview>
								</section>
							)}
							{activeTab === PreviewTab.METADATA && (
								<EditArticleMetadata
									article={articleData}
									revision={activeRevision}
									updateRevision={this.setRevisionData}
								/>
							)}
						</main>
						<aside>
							<h2>Details</h2>
							<p>
								<strong>Creator:</strong> {articleData?.createdBy?.alias} <br />
								<strong>Created:</strong> {articleData?.createdOn} <br />
								<strong>Last Updated:</strong> {articleData?.updatedOn} <br />
								<strong>Published:</strong> {articleData?.published ? "True" : "False"}
								{articleData?.published && (
									<>
										<strong>Published Revision:</strong> {articleData?.revision?.id}
									</>
								)}
							</p>
							<label className="uk-form-label" htmlFor="revision-selector">
								<strong>Revision</strong>
							</label>
							<div className="uk-form-controls">
								<select defaultValue="-1" className="uk-select" id="revision-selector" onChange={this.setRevisionData}>
									{revisionsData.length === 0 && (
										<option value="-1">No Revision Created</option>
									)}
									{(!activeRevision && revisionsData.length !== 0) && (
										<option value="-2">No Active Revision</option>
									)}
									{revisionsData.sort((a, b) => a.id < b.id).map(revision => (
										<option
											selected={revision.id === activeRevision?.id}
											value={revision.id}
											key={revision.id}
										>
											{revision.id} ({revision.createdOn})
										</option>
									))}
								</select>
								<PublishText>
									To publish your article revision please speak to an administrator.
								</PublishText>
							</div>
							<br />
							<ImageManager />
						</aside>
					</Layout>
				</Container>
			</ProtectedPageTemplate>
		);
	}
}

export default withRouter(ManageArticle);