import React from "react";
import UIkit from "uikit";
import ProtectedPageTemplate from "../../components/templates/ProtectedPageTemplate";
import Container from "../../components/templates/Container";
import ArticleTable from "../../components/organisms/ArticlesTable";
import CreateArticleForm from "../../components/organisms/CreateArticleForm";
import Breadcrumb from "../../components/molecules/Breadcrumb";

function CMS() {
	return (
		<ProtectedPageTemplate page="CMS">
			<Container>
				<Breadcrumb links={[
					{ text: "CMS" }
				]} />
				<h1>Content Management</h1>
				<p>The CodeSupport CMS allows you to manage content you have created across the website.</p>
				<section>
					<h2 className="uk-h2">
						Manage Articles
					</h2>
					<p>
						These are articles that you have created or been invited to contribute to.
					</p>
					<ArticleTable />
					<button
						type="button"
						data-uk-toggle="target: #create-article-form"
						className="uk-button uk-button-default uk-button-small"
					>
						Create An Article
					</button>
				</section>
			</Container>
			<div id="create-article-form" data-uk-modal>
				<div className="uk-modal-dialog uk-modal-body">
					<CreateArticleForm />
				</div>
			</div>
		</ProtectedPageTemplate>
	);
}

export default CMS;