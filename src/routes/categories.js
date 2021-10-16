import { categorySchema } from '../data/dataValidation.js';

import {
	searchAllCategories,
	searchCategoryByName,
	insertCategory,
} from '../data/categories.js';

const route = '/categories';

async function getAllCategories(request, response) {
	try {
		const categories = await searchAllCategories();
		response.status(200).send(categories.rows);
	} catch (error) {
		response
			.status(500)
			.send('There was an internal error. Please try again later.');

		console.log(error);
	}
}

async function addCategory(request, response) {
	const { name } = request.body;
	const validationError = categorySchema.validate({ name }).error;

	if (validationError) {
		response.status(400).send(validationError.message);
		return;
	}

	try {
		const categories = await searchCategoryByName(name);

		if (categories.rows.length > 0) {
			response.status(409).send('This category already exists');
			return;
		}

		const successfulInsert = await insertCategory(name);
		response.sendStatus(201);
	} catch (error) {
		response
			.status(500)
			.send('There was an internal error. Please try again later.');

		console.log(error);
	}
}

const categories = {
	route,
	getAllCategories,
	addCategory,
};

export default categories;
