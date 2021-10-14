const route = '/games';

function getAllGames(request, response, dbConnection) {
	response.sendStatus(501);
}

function addGame(request, response, dbConnection) {
	response.sendStatus(501);
}

const customers = {
	route,
	getAllGames,
	addGame,
};

export default customers;
