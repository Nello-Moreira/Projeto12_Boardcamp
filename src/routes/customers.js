const route = '/customers';

async function getAllCustomers(request, response, dbConnection) {
	response.sendStatus(501);
}

async function getCustomer(request, response, dbConnection) {
	response.sendStatus(501);
}

async function addCustomer(request, response, dbConnection) {
	response.sendStatus(501);
}

async function changeCustomer(request, response, dbConnection) {
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
