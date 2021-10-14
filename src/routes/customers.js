const route = '/customers';

function getAllCustomers(request, response, dbConnection) {
	response.sendStatus(501);
}

function getCustomer(request, response, dbConnection) {
	response.sendStatus(501);
}

function addCustomer(request, response, dbConnection) {
	response.sendStatus(501);
}

function changeCustomer(request, response, dbConnection) {
	response.sendStatus(501);
}

const customers = {
	route,
	getAllCustomers,
	getCustomer,
	addCustomer,
	changeCustomer,
};

export default customers;
