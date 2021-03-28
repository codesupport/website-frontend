import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import UIkit from "uikit";
import Article from "../../../components/molecules/Article";
import Markdown from "../../../components/atoms/Markdown";
import ProtectedPageTemplate from "../../../components/templates/ProtectedPageTemplate";
import Link from "next/link";
import Container from "../../../components/templates/Container";
import ImageManager from "../../../components/organisms/ImageManager";
import Button from "../../../components/atoms/Button";
import FormLabel from "../../../components/molecules/FormLabel";
import TextInput from "../../../components/atoms/TextInput";
import ArticleService from "../../../services/ArticleService";
import {useRouter, withRouter} from "next/router";
import EditArticleMetadata from "../../../components/organisms/EditArticleMetadata";
import Breadcrumb from "../../../components/molecules/Breadcrumb";
import ArticleRevisionService from "../../../services/ArticleRevisionService";

const Layout = styled("div")`
	margin: 0 auto;
	display: grid;
	grid-template-columns: auto 275px;
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
	border: 1px solid var(--border);
`;


const PreviewTab = {
	CONTENT: 0,
	PREVIEW: 1,
	METADATA: 2
};

// function ManageArticle() {
// 	const revisionService = new ArticleRevisionService();
// 	const router = useRouter();
// 	const article = new ArticleService();
// 	const [error, setError] = useState(undefined);
// 	const [articleData, setArticleData] = useState(undefined);
// 	const [content, setContent] = useState("");
// 	const [revisions, setRevisions] = useState([]);
// 	const [activeRevision, setActiveRevision] = useState({});
// 	const [tab, setTab] = useState(PreviewTab.CONTENT);
// 	const id = router.query?.path;
//
// 	useEffect(() => {
// 		(async () => {
// 			try {
// 				const data = await article.getArticleById(id);
//
// 				setArticleData(data);
// 				setActiveRevision(data?.revision);
// 				setError(undefined);
// 			} catch ({ message }) {
// 				setError(message);
// 			}
// 		})();
// 	}, []);
//
// 	const updateRevision = event => {
// 		const newRevisionId = +event.target.value;
// 		const rev = revisions.find(r => r.id === newRevisionId);
//
// 		setActiveRevision(rev);
// 	};
//
// 	const saveContent = async () => {
// 		try {
// 			const revisionId = await revisionService.createArticleRevision(articleData.id, {
// 				content,
// 				description: activeRevision.description,
// 				tags: activeRevision.tags
// 			});
//
// 			updateRevision({
// 				target: {
// 					value: revisionId
// 				}
// 			});
//
// 			setError(undefined);
// 		} catch ({ message }) {
// 			setError(message);
// 		}
// 	};
//
// 	useEffect(() => {
// 		(async () => {
// 			try {
// 				const data = await article.getArticleRevisions(id);
//
// 				setRevisions(data);
// 				setError(undefined);
// 			} catch ({ message }) {
// 				setError(message);
// 			}
// 		})();
// 	}, [articleData, activeRevision]);
//
// 	useEffect(() => {
// 		setContent(activeRevision?.content);
// 	}, [activeRevision]);
//
// 	return (
// 		<ProtectedPageTemplate page="Manage Article">
// 			<Container>
// 				<Breadcrumb links={[
// 					{ text: "CMS", link: "cms" },
// 					{ text: "Manage Articles" }
// 				]} />
// 				{error && (
// 					<section className="uk-alert uk-alert-danger">
// 						<strong>Error:</strong> {error}
// 					</section>
// 				)}
// 				<h1>Manage Article</h1>
// 				<Layout>
// 					<main>
// 						<h2>Editor</h2>
// 						<ul data-uk-tab>
// 							<li
// 								onClick={() => setTab(PreviewTab.CONTENT)}
// 								className={tab === PreviewTab.CONTENT && "uk-active"}
// 							>
// 								<a>
// 									Content
// 								</a>
// 							</li>
// 							<li
// 								onClick={() => setTab(PreviewTab.PREVIEW)}
// 								className={tab === PreviewTab.PREVIEW && "uk-active"}
// 							>
// 								<a>
// 									Preview
// 								</a>
// 							</li>
// 							<li
// 								onClick={() => setTab(PreviewTab.METADATA)}
// 								className={tab === PreviewTab.METADATA && "uk-active"}
// 							>
// 								<a>
// 									Metadata
// 								</a>
// 							</li>
// 						</ul>
// 						{tab === PreviewTab.CONTENT && (
// 							<section>
// 								<TextArea onChange={({ target }) => setContent(target.value)} value={content} cols={50} />
// 								<Button type="button" onClick={saveContent}>
// 									Save
// 								</Button>
// 							</section>
// 						)}
// 						{tab === PreviewTab.PREVIEW && (
// 							<section>
// 								<Preview className="uk-article">
// 									<Markdown content={content} />
// 								</Preview>
// 							</section>
// 						)}
// 						{tab === PreviewTab.METADATA && (
// 							<EditArticleMetadata
// 								article={articleData}
// 								revision={activeRevision}
// 								updateRevision={updateRevision}
// 							/>
// 						)}
// 					</main>
// 					<aside>
// 						<h2>Details</h2>
// 						<p>
// 							<strong>Creator:</strong> {articleData?.createdBy?.alias} <br />
// 							<strong>Created:</strong> {articleData?.createdOn} <br />
// 							<strong>Last Updated:</strong> {articleData?.updatedOn} <br />
// 							<strong>Published:</strong> {articleData?.published ? "True" : "False"}
// 							{articleData?.published && (
// 								<>
// 									<strong>Published Revision:</strong> {articleData?.revision?.id}
// 								</>
// 							)}
// 						</p>
// 						<label className="uk-form-label" htmlFor="revision-selector">
// 							<strong>Revision</strong>
// 						</label>
// 						<div className="uk-form-controls">
// 							<select className="uk-select" id="revision-selector" onChange={updateRevision}>
// 								{revisions.length === 0 && (
// 									<option selected>No Revision Created</option>
// 								)}
// 								{revisions.reverse().map(revision => (
// 									<option selected={revision.id === activeRevision?.id} value={revision.id} key={revision.id}>
// 										{revision.id} ({revision.createdOn})
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 						<br />
// 						<ImageManager />
// 					</aside>
// 				</Layout>
// 			</Container>
// 		</ProtectedPageTemplate>
// 	);
// }

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

	saveContent = async () => {
		const { articleData, content } = this.state;

		console.log(1);

		try {
			const revisionId = await this.revisionService.createArticleRevision(articleData.id, {
				content,
				description: articleData.revision?.description,
				tags: articleData.revision?.tags
			});

			console.log(2);

			this.setRevisionData({
				target: {
					value: revisionId
				}
			});

			console.log(3);

			this.setState({
				success: `Created and saved new revision (Revision ID: ${revisionId})`
			});
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

		if (!revisionsData.find(revision => revision.id === revisionId)) {
			return this.getData(revisionId);
		}

		this.setState({
			activeRevision: revisionId
		});
	}

	setActiveTab = tab => {
		this.setState({
			activeTab: tab
		});
	}

	getData = async revisionId => {
		const articleId = 1;

		try {
			this.setState({
				loading: true,
				error: undefined
			});

			const articleData = await this.articleService.getArticleById(articleId);
			const revisionsData = await this.articleService.getArticleRevisions(articleId);

			this.setState({
				articleData,
				revisionsData,
				content: articleData.revision.content,
				activeRevision: revisionId ?? articleData.revision,
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
									<TextArea onChange={this.setContent} value={content} cols={50} />
									<Button type="button" onClick={() => this.saveContent()}>
										Save
									</Button>
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
									{revisionsData.reverse().map(revision => (
										<option
											selected={revision.id === activeRevision?.id}
											value={revision.id}
											key={revision.id}
										>
											{revision.id} ({revision.createdOn})
										</option>
									))}
								</select>
								<button disabled type="button" className="uk-button">
									Publish Revision
								</button>
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