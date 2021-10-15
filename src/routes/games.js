import { alreadyExists, gameSchema } from '../data/dataValidation.js';
import { searchAllGames, searchGameByName, insertGame } from '../data/games.js';

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

	try {
		const games = await searchGameByName(dbConnection, gameObject.name);

		if (games.rows.length > 0) {
			response.status(409).send('This game already exists');
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
