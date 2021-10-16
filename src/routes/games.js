import { gameSchema } from '../data/dataValidation.js';

import { searchAllGames, searchGameByName, insertGame } from '../data/games.js';
import { searchCategoryById } from '../data/categories.js';

const route = '/games';

async function getAllGames(request, response, dbConnection) {
	const { name } = request.query;

	try {
		let games;

		if (name) {
			games = await searchGameByName(dbConnection, name);
		} else {
			games = await searchAllGames(dbConnection);
		}
		response.status(200).send(games.rows);
	} catch (error) {
		response
			.status(500)
			.send('There was an internal error. Please try again later.');

		console.log(error);
	}
}

async function addGame(request, response, dbConnection) {
	const gameObject = request.body;

	const validationError = gameSchema.validate(gameObject).error;

	if (validationError) {
		response.status(400).send(validationError.message);
		return;
	}

	try {
		const games = await searchGameByName(dbConnection, gameObject.name);
		const categories = await searchCategoryById(
			dbConnection,
			gameObject.categoryId
		);

		if (games.rows.length > 0) {
			response.status(409).send('This game already exists');
			return;
		}

		if (categories.rows.length === 0) {
			response.status(400).send('"categoryId" must be an existing id');
			return;
		}

		insertGame(dbConnection, gameObject);
		response.sendStatus(201);
	} catch (error) {
		response
			.status(500)
			.send('There was an internal error. Please try again later.');

		console.log(error);
	}
}

const customers = {
	route,
	getAllGames,
	addGame,
};

export default customers;
