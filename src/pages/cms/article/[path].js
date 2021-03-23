import React, { useState, useEffect } from "react";
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
import {useRouter} from "next/router";
import EditArticleMetadata from "../../../components/organisms/EditArticleMetadata";
import Breadcrumb from "../../../components/molecules/Breadcrumb";

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

const Output = styled("p")`
	font-family: "Courier New", sans-serif;
	word-break: break-all;
`;

const PreviewTab = {
	CONTENT: 0,
	PREVIEW: 1,
	METADATA: 2
};

function ManageArticle() {
	const router = useRouter();
	const article = new ArticleService();
	const [error, setError] = useState(undefined);
	const [articleData, setArticleData] = useState(undefined);
	const [content, setContent] = useState("");
	const [revisions, setRevisions] = useState([]);
	const [activeRevision, setActiveRevision] = useState({});
	const [tab, setTab] = useState(PreviewTab.CONTENT);
	const id = router.query.path ?? 1; // TODO: this doesn't work

	useEffect(() => {
		(async () => {
			try {
				const data = await article.getArticleById(id);

				setArticleData(data);
				setActiveRevision(data?.revision);
			} catch ({ message }) {
				setError(message);
			}
		})();
	}, []);

	const updateRevision = event => {
		const newRevisionId = +event.target.value;
		const rev = revisions.find(r => r.id === newRevisionId);

		setActiveRevision(rev);
	};

	useEffect(() => {
		(async () => {
			try {
				const data = await article.getArticleRevisions(id);

				setRevisions(data);
			} catch ({ message }) {
				setError(message);
			}
		})();
	}, [articleData, activeRevision]);

	useEffect(() => {
		setContent(activeRevision?.content);
	}, [activeRevision]);

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
				<h1>Manage Article</h1>
				<Layout>
					<main>
						<h2>Editor</h2>
						<ul data-uk-tab>
							<li
								onClick={() => setTab(PreviewTab.CONTENT)}
								className={tab === PreviewTab.CONTENT && "uk-active"}
							>
								<a>
									Content
								</a>
							</li>
							<li
								onClick={() => setTab(PreviewTab.PREVIEW)}
								className={tab === PreviewTab.PREVIEW && "uk-active"}
							>
								<a>
									Preview
								</a>
							</li>
							<li
								onClick={() => setTab(PreviewTab.METADATA)}
								className={tab === PreviewTab.METADATA && "uk-active"}
							>
								<a>
									Metadata
								</a>
							</li>
						</ul>
						{tab === PreviewTab.CONTENT && (
							<section>
								<TextArea onChange={({ target }) => setContent(target.value)} value={content} cols={50} />
								<Button type="button">
									Save
								</Button>
							</section>
						)}
						{tab === PreviewTab.PREVIEW && (
							<section>
								<Preview className="uk-article">
									<Markdown content={content} />
								</Preview>
							</section>
						)}
						{tab === PreviewTab.METADATA && (
							<EditArticleMetadata
								article={articleData}
								revision={activeRevision}
								updateRevision={updateRevision}
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
							<select className="uk-select" id="revision-selector" onChange={updateRevision}>
								{revisions.reverse().map(revision => (
									<option selected={revision.id === activeRevision?.id} value={revision.id} key={revision.id}>
										{revision.id} ({revision.createdOn})
									</option>
								))}
							</select>
						</div>
						<br />
						<ImageManager />
					</aside>
				</Layout>
			</Container>
		</ProtectedPageTemplate>
	);
}

export default ManageArticle;