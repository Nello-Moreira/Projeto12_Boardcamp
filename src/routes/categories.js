import {
	alreadyExists,
	categoryInputValidation,
} from '../data/dataValidation.js';
import { searchAllCategories, insertCategory } from '../data/categories.js';

const route = '/categories';

function getAllCategories(request, response, dbConnection) {
	searchAllCategories(dbConnection).then(queryResult => {
		response.status(200).send(queryResult.rows);
	});
}

function addCategory(request, response, dbConnection) {
	const { name } = request.body;

	const validationError = categoryInputValidation.validate({ name }).error;

	if (validationError) {
		response.status(400).send(validationError.message);
		return;
	}

	searchAllCategories(dbConnection).then(queryResult => {
		if (alreadyExists({ name }, queryResult.rows, 'name')) {
			response.status(409).send('This category already exists');
			return;
		}

		insertCategory(dbConnection, name)
			.then(queryResult => {
				response.sendStatus(201);
			})
			.catch(console.error());
	});
}

const categories = {
	route,
	getAllCategories,
	addCategory,
};

export default categories;
