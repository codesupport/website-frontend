import React, {Component} from "react";
import styled from "styled-components";

import PageTemplate from "../components/templates/PageTemplate";
import IntroHero from "../components/molecules/IntroHero";
import Card from "../components/molecules/Card";
import CardGroup from "../components/molecules/CardGroup";
import SearchBar from "../components/molecules/SearchBar";

import Container from "../components/templates/Container";

import {fetchResources} from '../lib/fetchResources';
import {categories} from '../config.json';
import Dropdown from "../components/molecules/Dropdown";

const ResourceFilters = styled("div")`
    padding-bottom: 25px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
`;

export default class Resources extends Component {
    state = {
        resources: this.props.resources,
        constantResources: this.props.resources,
        filterResources: "Show All",
        filterPrice: "Show All",
        status: "Loading..."
    };

    searchResources = (event) => {
        const query = event.target.value.toLowerCase();

        if (query === "") {
            this.setState({resources: this.state.constantResources});
        } else {
            let resourcesThatMatchQuery = [];

            for (const resource of this.state.constantResources) {
                if (resource.name.toLowerCase().includes(query)) {
                    resourcesThatMatchQuery.push(resource);
                }
            }

            if (!resourcesThatMatchQuery.length) {
                this.setState({status: "No matches found..."});
            }

            this.setState({
                status: null,
                resources: resourcesThatMatchQuery
            });
        }
    };

    filterResources = async (event) => {
        let resources = this.state.constantResources;
        const value = event.target.value;

        if (value !== "Show All") {
            resources = await resources.filter((resource) => resource.category.toLowerCase() === value);
        }

        this.setState({resources, filterResources: value});
    };

    filterPrice = async (event) => {
        let resources = this.state.constantResources;
        const value = event.target.value;

        if (value !== "Show All" && ["true", "false"].includes(value)) {
            resources = await resources.filter((resource) => resource.free === JSON.parse(value));
        }

        this.setState({resources, filterPrice: value});
    };

    render() {
        const {resources, status} = this.state;

        return (
            <PageTemplate page="Resources" meta={{
                description: "A collection of programming resources curated by the CodeSupport community."
            }}>
                <IntroHero
                    title="Resources"
                    description="A collection of programming resources curated by the CodeSupport community."
                />
                <section id="filter-resources" role="search">
                    <Container>
                        <SearchBar label={"Search for a resource"} onChangeHandler={this.searchResources} />
                        <ResourceFilters>
                            <Dropdown label={"Filter by category"} onChangeHandler={this.filterResources} value={this.state.filterResources}>
                                <option value="Show All" key="all">Show All</option>
                                {categories.map((category) => (
                                    <option value={category.toLowerCase()} key={category}>{category}</option>
                                ))}
                            </Dropdown>
                            <Dropdown label={"Filter by price"} onChangeHandler={this.filterPrice} value={this.state.filterPrice}>
                                <option value="Show All" key="all">Show All</option>
                                <option value="true" key="true">Free</option>
                                <option value="false" key="false">Paid</option>
                            </Dropdown>
                        </ResourceFilters>
                    </Container>
                </section>
                <main>
                    <Container>
                        {!resources.length ? status :
                            <CardGroup width={3}>
                                {resources.map((resource) =>
                                    <Card
                                        key={resource.key}
                                        tag={resource.category}
                                        tagClass={`lang-${resource.category.toLowerCase()}`}
                                        title={resource.affiliate_link ? `${resource.name}*` : resource.name}
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
                                )}
                            </CardGroup>
                        }
                        <p>
                            <b>Disclaimer:</b> Resources with a <code>*</code> are affiliate links.
                        </p>
                    </Container>
                </main>
            </PageTemplate>
        )
    }
}

export async function getStaticProps() {
    const resources = await fetchResources();
    return {
        props: {
            resources
        }
    }
}
