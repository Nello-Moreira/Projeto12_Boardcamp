import { isEmptyString, alreadyExists } from '../data/dataValidation.js';

const route = '/categories';

function getCategories(request, response, dbConnection) {
	dbConnection.query('SELECT * FROM categories;').then(queryResult => {
		response.status(200).send(queryResult.rows);
	});
}

function addCategory(request, response, dbConnection) {
	const { name } = request.body;
	console.log(name);

	if (isEmptyString(name)) {
		response.status(400).send('Please enter a name');
		return;
	}

	dbConnection.query('SELECT * FROM categories;').then(queryResult => {
		if (alreadyExists({ name }, queryResult.rows, 'name')) {
			response.status(409).send('This category already exists');
			return;
		}

		dbConnection
			.query('INSERT INTO categories (name) VALUES ($1);', [name])
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
