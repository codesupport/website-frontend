import { Component } from "react";
import { NextRouter, useRouter } from "next/router";
import styled from "styled-components";

import PageTemplate from "../components/templates/PageTemplate";
import IntroHero from "../components/molecules/IntroHero";
import URLCard from "../components/molecules/URLCard";
import CardGroup from "../components/molecules/CardGroup";
import SearchBar from "../components/molecules/SearchBar";
import Container from "../components/templates/Container";
import Dropdown from "../components/molecules/Dropdown";

import { fetchResources, Resource } from "../lib/fetchResources";
import config from "../config.json";
import getQueryParams from "../helpers/getQueryParams";

const ResourceFilters = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacer);
  margin: var(--spacer) 0 calc(var(--spacer) * 2) 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ResourcesPageContentContainer = styled.div`
  padding: calc(var(--spacer) * 2) 0;
`;

const LearnMore = styled("p")`
  color: var(--cs-blue);
  font-weight: 700;
`;

interface ResourcesProps {
  resources: Resource[];
  router: NextRouter;
}

interface FilterEvent {
  target: {
    value: string;
    name: string;
  };
}

interface ResourcesAndFilters {
  resources: Resource[];
  category: string;
  price: string;
  search: string;
}

const { categories } = config;

class Resources extends Component<ResourcesProps> {
	state = {
		resources: this.props.resources,
		constantResources: this.props.resources,
		filterCategory: "Show All",
		filterPrice: "Show All",
		filterSearch: "",
		status: "Loading..."
	};

	filterResources = async (event: FilterEvent) => {
		const resourcesAndFilters = this.getResourcesAndFilters(event);

		resourcesAndFilters.resources = this.getFilteredResources(
			resourcesAndFilters.resources,
			resourcesAndFilters.category,
			resourcesAndFilters.price,
			resourcesAndFilters.search
		);

		this.changeUrl(resourcesAndFilters.category);

		this.setState({
			resources: resourcesAndFilters.resources,
			filterCategory: resourcesAndFilters.category,
			filterPrice: resourcesAndFilters.price,
			filterSearch: resourcesAndFilters.search
		});

		const noMatchesFound = resourcesAndFilters.resources.length === 0;

		if (noMatchesFound) {
			this.setState({ status: "No matches found..." });
		}
	};

	getResourcesAndFilters(event: FilterEvent) {
		const value = event.target.value;
		const targetName = event.target.name as Exclude<keyof ResourcesAndFilters, "resources">;

		const resourcesAndFilters: ResourcesAndFilters = {
			resources: this.state.constantResources,
			category: this.state.filterCategory,
			price: this.state.filterPrice,
			search: this.state.filterSearch
		};

		resourcesAndFilters[targetName] = value;

		return resourcesAndFilters;
	}

	getFilteredResources = (
		theResources: Resource[],
		theCategoryFilter: string,
		thePriceFilter: string,
		theSearchFilter: string
	) => {
		const SHOW_ALL = "Show All";
		const BLANK = "";

		return theResources.filter(resource => {
			const isResource = theCategoryFilter === SHOW_ALL ? true : resource.category.toLowerCase() === theCategoryFilter;

			const isPrice = thePriceFilter === SHOW_ALL ? true : resource.free === JSON.parse(thePriceFilter);

			const name = resource.name.toLowerCase();
			const filter = theSearchFilter.toLowerCase();
			const isSearch =
        theSearchFilter === BLANK ? true : name.includes(filter) || resource.tags.some(val => val.includes(filter));

			return isPrice && isResource && isSearch;
		});
	};

	changeUrl(theCategoryFilter: string) {
		const SHOW_ALL = "Show All";

		void this.props.router.push(
			theCategoryFilter !== SHOW_ALL ? `/resources?category=${theCategoryFilter}` : "/resources",
			undefined,
			{ shallow: true }
		);
	}

	componentDidMount() {
		const categoriesLower = categories.map(c => c.toLowerCase());
		const category = getQueryParams(this.props.router).category?.toLowerCase();

		if (category && categoriesLower.includes(category)) {
			void this.filterResources({
				target: {
					value: category,
					name: "category"
				}
			});
		}
	}

	render() {
		const { resources, status } = this.state;

		const sortedCategories = categories.sort();

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
				<main>
					<ResourcesPageContentContainer>
						<section id="filter-resources" role="search">
							<Container>
								<SearchBar label="Search for a resource" name="search" onChangeHandler={this.filterResources} />
								<ResourceFilters>
									<Dropdown
										name="category"
										label="Filter by category"
										onChangeHandler={this.filterResources}
										value={this.state.filterCategory}
									>
										<option value="Show All" key="all">
                      Show All
										</option>
										{sortedCategories.map(category => (
											<option value={category.toLowerCase()} key={category}>
												{category}
											</option>
										))}
									</Dropdown>
									<Dropdown
										name="price"
										label="Filter by price"
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
						<Container>
							{!resources.length ? (
								status
							) : (
								<CardGroup width={3}>
									{resources.map(resource => (
										<URLCard
											key={resource.key}
											href={resource.url}
											target="_blank"
											rel="noopener noreferrer"
											tag={resource.category}
											tagClass={`lang-${resource.category.toLowerCase()}`}
											title={resource.affiliate_link ? `${resource.name}*` : resource.name}
											description={resource.description}
										>
											<LearnMore className="read-more-button">Learn More</LearnMore>
										</URLCard>
									))}
								</CardGroup>
							)}
							<p>
								<b>Disclaimer:</b> Resources with a <code>*</code> are affiliate links.
							</p>
						</Container>
					</ResourcesPageContentContainer>
				</main>
			</PageTemplate>
		);
	}
}

type ResourcesHelperProps = Exclude<ResourcesProps, "router">;

function ResourcesWithRouter(props: ResourcesHelperProps) {
	const router = useRouter();

	return <Resources {...props} router={router} />;
}

ResourcesWithRouter.displayName = "ResourcesWithRouter";

export default ResourcesWithRouter;

export async function getStaticProps() {
	const resources = await fetchResources();

	return {
		props: {
			resources
		}
	};
}
