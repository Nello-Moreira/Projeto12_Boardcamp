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

	console.log(gameObject);
	try {
		insertGame(dbConnection, gameObject);
		response.sendStatus(201);
	} catch (error) {
		response
			.status(500)
			.send('There was an internal error. Please try again later.');

		console.log(error);
		return;
	}
}

const customers = {
	route,
	getAllGames,
	addGame,
};

export default customers;
