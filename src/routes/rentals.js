const route = '/rentals';

function getAllRentals(request, response, dbConnection) {
	response.sendStatus(501);
}

function withdrawRental(request, response, dbConnection) {
	response.sendStatus(501);
}

function returnRental(request, response, dbConnection) {
	response.sendStatus(501);
}

function removeRental(request, response, dbConnection) {
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
