const route = '/rentals';

async function getAllRentals(request, response, dbConnection) {
	response.sendStatus(501);
}

async function withdrawRental(request, response, dbConnection) {
	response.sendStatus(501);
}

async function returnRental(request, response, dbConnection) {
	response.sendStatus(501);
}

async function removeRental(request, response, dbConnection) {
	response.sendStatus(501);
}

const customers = {
	route,
	getAllRentals,
	withdrawRental,
	returnRental,
	removeRental,
};

export default customers;
