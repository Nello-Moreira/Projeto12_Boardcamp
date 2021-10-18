import { customerSchema } from '../data/dataValidation.js';

import {
	searchAllCustomers,
	searchCustomersByCpf,
	searchCustomersById,
	insertCustomer,
	updateCustomer,
} from '../data/customers.js';

import { internalErrorResponse } from '../helpers.js';

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
		internalErrorResponse(response, error);
	}
}

async function getCustomerById(request, response) {
	const id = Number(request.params.id);

	if (isNaN(id) || id % 1 !== 0) {
		response.status(400).send('You must enter a valid id');
		return;
	}

	try {
		const customer = await searchCustomersById(id);

		if (customer.rows.length === 0) {
			response.status(404).send('Customer not found');
			return;
		}
		response.status(200).send(customer.rows[0]);
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

async function addCustomer(request, response) {
	const newCustomer = request.body;
	const customerValidation = customerSchema.validate(newCustomer);
	let customers;

	if (customerValidation.error) {
		response.status(400).send(customerValidation.error.message);
		return;
	}

	try {
		customers = await searchCustomersByCpf(newCustomer.cpf);

		if (customers.rows.length > 0) {
			response.status(409).send('This cpf is already being used');
			return;
		}

		const successfulInsert = await insertCustomer(newCustomer);
		response.sendStatus(201);
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

async function changeCustomer(request, response) {
	const { id } = request.params;
	const customer = request.body;
	const customerValidation = customerSchema.validate(customer);

	if (customerValidation.error) {
		response.status(400).send(customerValidation.error.message);
		return;
	}

	try {
		const registeredCustomer = await searchCustomersById(id);

		if (registeredCustomer.rows.length === 0) {
			response.status(400).send('This user is not registered');
			return;
		}

		const successfulUpdate = await updateCustomer({ id, ...customer });

		response.sendStatus(200);
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

const customers = {
	route,
	getAllCustomers,
	getCustomerById,
	addCustomer,
	changeCustomer,
};

export default customers;
