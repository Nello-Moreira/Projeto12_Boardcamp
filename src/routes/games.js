const route = '/games';

async function getAllGames(request, response, dbConnection) {
	response.sendStatus(501);
}

async function addGame(request, response, dbConnection) {
	response.sendStatus(501);
}

const customers = {
	route,
	getAllGames,
	addGame,
};

export default customers;
