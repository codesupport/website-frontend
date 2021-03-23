import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import ArticleService from "../../services/ArticleService";
import Link from "next/link";

function ArticleTable() {
	const articleService = new ArticleService();
	const [articles, setArticles] = useState(undefined);
	const [error, setError] = useState(undefined);

	useEffect(() => {
		(async () => {
			try {
				const data = await articleService.getAllArticlesByUser();

				setArticles(data);
			} catch ({ message }) {
				setError(message);
			}
		})();
	}, []);

	return (
		<section>
			{error && <div className="uk-alert uk-alert-danger">{error}</div>}
			{!error && articles?.length > 1 ? (
				<table className="uk-table uk-table-small uk-table-divider uk-table-hover">
					<thead>
						<tr>
							<th>Title</th>
							<th>Created</th>
							<th>Last Updated</th>
							<th>Published</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{articles.map(article => (
							<tr key={article.id}>
								<td>{article.title}</td>
								<td>{article.createdOn}</td>
								<td>{article.updatedOn}</td>
								<td>{article.published ? "True" : "False"}</td>
								<td className="uk-flex uk-flex-between">
									<Link href={`/cms/article/${article.id}`}>
										<FontAwesomeIcon icon={faPencilAlt} />
									</Link>
									<FontAwesomeIcon icon={faTrash} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="uk-background-muted uk-padding uk-panel">
					<p className="uk-text-center">You have not created any articles yet.</p>
				</div>
			)}
		</section>
	);
}

export default ArticleTable;