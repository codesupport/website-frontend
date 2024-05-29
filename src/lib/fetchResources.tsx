import axios from "axios";
import config from "../config.json";

export interface Resource {
	name: string;
	description: string;
	url: string;
	free: boolean;
	tags: string[];
	category: string;
	key: string;
	affiliate_link?: string;
}

const { resourceAPI, categories } = config;

export async function fetchResources() {
	try {
		let resources: Resource[] = [];

		for (const category of categories) {
			const { data } = await axios.get<unknown, {data: Resource[]}>(`${resourceAPI}/${category.toLowerCase()}.json`);

			resources = resources.concat(data.map((resource, i) => ({
				...resource,
				category,
				key: `${category}-${i}`
			})));
		}

		resources = resources.sort((resOne, resTwo) => {
			const a = resOne.name.toLowerCase();
			const b = resTwo.name.toLowerCase();

			if (a > b) return 1;
			if (b > a) return -1;
			return 0;
		});

		return resources;
	} catch (error) {
		throw new Error("There was an error getting the resources.");
	}
}
