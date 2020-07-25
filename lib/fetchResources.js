import axios from "axios";
import { resourceAPI, categories } from '../config.json';

export async function fetchResources(category) {
    try {
        let resources = [];

        for (const category of categories) {
            const { data } = await axios.get(`${resourceAPI}/${category.toLowerCase()}.json`);

            resources = resources.concat(data.map((resource, i) => ({
                ...resource,
                category,
                key: `${category}-${i}`
            })));
        }

        return resources;
    } catch (error) {
        throw new Error(`There was an error getting the ${category} resources.`);
    }
}