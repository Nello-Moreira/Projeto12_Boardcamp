import { isEmptyString, alreadyExists } from '../data/dataValidation.js';
import { getAllCategories, insertCategory } from '../data/categories.js';

const route = '/categories';

function getCategories(request, response, dbConnection) {
	getAllCategories(dbConnection).then(queryResult => {
		response.status(200).send(queryResult.rows);
	});
}

function addCategory(request, response, dbConnection) {
	const { name } = request.body;

	if (isEmptyString(name)) {
		response.status(400).send('Please enter a name');
		return;
	}

	getAllCategories(dbConnection).then(queryResult => {
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
	getCategories,
	addCategory,
};

export default categories;
