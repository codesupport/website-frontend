import React, { Component } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import PageTemplate from "../components/templates/PageTemplate";
import IntroHero from "../components/molecules/IntroHero";
import Card from "../components/molecules/Card";
import CardGroup from "../components/molecules/CardGroup";
import SearchBar from "../components/molecules/SearchBar";
import Container from "../components/templates/Container";
import Dropdown from "../components/molecules/Dropdown";

import { fetchResources } from "../lib/fetchResources";
import { categories } from "../config.json";
import getQueryParams from "../helpers/getQueryParams";

const ResourceFilters = styled("div")`
  padding-top: 15px;
  padding-bottom: 25px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
`;

class Resources extends Component {
	state = {
		resources: this.props.resources,
		constantResources: this.props.resources,
		filterResources: "Show All",
		filterPrice: "Show All",
		status: "Loading..."
	};

	filterResources = async () => {
		const resourcesAndFilters = this.getResourcesAndFilters();

		resourcesAndFilters[0] = this.getFilteredResources(...resourcesAndFilters);
		this.changeUrl(resourcesAndFilters[2]);

		this.setState({
			resources: resourcesAndFilters[0],
			filterResources: resourcesAndFilters[1],
			filterPrice: resourcesAndFilters[2]
		});

		const noMatchesFound = resourcesAndFilters[0].length !== 0;

		if (noMatchesFound) {
			this.setState({ status: "No matches found..." });
		}
	};

	getResourcesAndFilters() {
		const resources = this.state.constantResources;

		const categoryFilter = document.getElementsByClassName(
			"resources__filter-category"
		)[0].value;
		const priceFilter = document.getElementsByClassName(
			"resources__filter-price"
		)[0].value;
		const searchFilter = document.getElementsByClassName(
			"resources__search-filter"
		)[0].value;

		const resourcesAndFilters = [
			resources,
			categoryFilter,
			priceFilter,
			searchFilter
		];

		return resourcesAndFilters;
	}

	getFilteredResources = (
		theResources,
		theCategoryFilter,
		thePriceFilter,
		theSearchFilter
	) => {
		const showAll = "Show All";
		const blank = "";

		return theResources.filter(resource => {
			const isResource = theCategoryFilter === showAll
				? true
				: resource.category.toLowerCase() === theCategoryFilter;

			const isPrice = thePriceFilter === showAll
				? true
				: resource.free === JSON.parse(thePriceFilter);

			const isSearch = theSearchFilter === blank
				? true
				: resource.name.toLowerCase().includes(theSearchFilter.toLowerCase());

			return isPrice && isResource && isSearch;
		});
	};

	changeUrl(theCategoryFilter) {
		const showAll = "Show All";

		if (theCategoryFilter !== showAll) {
			this.props.router.push(
				`/resources?category=${theCategoryFilter}`,
				undefined,
				{ shallow: true }
			);
		} else {
			this.props.router.push("/resources", undefined, { shallow: true });
		}
	}

	componentDidMount() {
		const categoriesLower = categories.map(c => c.toLowerCase());
		const category = getQueryParams(this.props.router).category?.toLowerCase();

		if (category && categoriesLower.includes(category)) {
			this.filterResources({
				target: {
					value: category
				}
			});
		}
	}

	render() {
		const { resources, status } = this.state;

		return (
			<PageTemplate
				page="Resources"
				meta={{
					description: "A collection of programming resources curated by the CodeSupport community."
				}}
			>
				<IntroHero
					title="Resources"
					description="A collection of programming resources curated by the CodeSupport community."
				/>
				<section id="filter-resources" role="search">
					<Container>
						<SearchBar
							className="resources__search-filter"
							label={"Search for a resource"}
							onChangeHandler={this.filterResources}
						/>
						<ResourceFilters>
							<Dropdown
								className="resources__filter-category"
								label={"Filter by category"}
								onChangeHandler={this.filterResources}
								value={this.state.filterResources}
							>
								<option value="Show All" key="all">
									Show All
								</option>
								{categories.map(category => (
									<option value={category.toLowerCase()} key={category}>
										{category}
									</option>
								))}
							</Dropdown>
							<Dropdown
								className="resources__filter-price"
								label={"Filter by price"}
								onChangeHandler={this.filterResources}
								value={this.state.filterPrice}
							>
								<option value="Show All" key="all">
								Show All
								</option>
								<option value="true" key="true">
								Free
								</option>
								<option value="false" key="false">
								Paid
								</option>
							</Dropdown>
						</ResourceFilters>
					</Container>
				</section>
				<main>
					<Container>
						{!resources.length
							? status
							: (
								<CardGroup width={3}>
									{resources.map(resource => (
										<Card
											key={resource.key}
											tag={resource.category}
											tagClass={`lang-${resource.category.toLowerCase()}`}
											title={
												resource.affiliate_link
													? `${resource.name}*`
													: resource.name
											}
											description={resource.description}
										>
											<a
												className="uk-button uk-button-text uk-margin-right"
												target="_blank"
												href={resource.url}
												rel="noopener noreferrer"
											>
											Learn More
											</a>
										</Card>
									))}
								</CardGroup>
							)}
						<p>
							<b>Disclaimer:</b> Resources with a <code>*</code> are affiliate links.
						</p>
					</Container>
				</main>
			</PageTemplate>
		);
	}
}

export default props => {
	const router = useRouter();

	return <Resources {...props} router={router} />;
};

export async function getStaticProps() {
	const resources = await fetchResources();

	return {
		props: {
			resources
		}
	};
}
