import { gameSchema } from '../data/dataValidation.js';

import { searchAllGames, searchGameByName, insertGame } from '../data/games.js';
import { searchCategoryById } from '../data/categories.js';

import { internalErrorResponse } from '../helpers.js';

const route = '/games';

async function getAllGames(request, response) {
	const { name } = request.query;

	try {
		let games;

		if (name) {
			games = await searchGameByName(name);
		} else {
			games = await searchAllGames();
		}
		response.status(200).send(games.rows);
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

async function addGame(request, response) {
	const gameObject = request.body;

	const validationError = gameSchema.validate(gameObject).error;

	if (validationError) {
		response.status(400).send(validationError.message);
		return;
	}

	try {
		const games = await searchGameByName(gameObject.name);
		const categories = await searchCategoryById(gameObject.categoryId);

		if (games.rows.length > 0) {
			response.status(409).send('This game already exists');
			return;
		}

		if (categories.rows.length === 0) {
			response.status(400).send('"categoryId" must be an existing id');
			return;
		}

		const successfulInsert = await insertGame(gameObject);
		response.sendStatus(201);
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

const customers = {
	route,
	getAllGames,
	addGame,
};

export default customers;
