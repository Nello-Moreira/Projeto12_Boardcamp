import { searchAllCustomers, searchCustomersByCpf } from '../data/customers.js';

const route = '/customers';

async function getAllCustomers(request, response) {
	const { cpf } = request.query;
	let customers;

	try {
		if (isNaN(cpf)) {
			customers = await searchAllCustomers();
			response.status(200).send(customers.rows);
			return;
		}
		customers = await searchCustomersByCpf(cpf);
		response.status(200).send(customers.rows);
		return;
	} catch (error) {
		response
			.status(500)
			.send('There was an internal error. Please try again later.');

		console.log(error);
	}
}

async function getCustomer(request, response) {
	response.sendStatus(501);
}

async function addCustomer(request, response) {
	response.sendStatus(501);
}

async function changeCustomer(request, response) {
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
