import dbConnection from '../data/connection.js';

const searchAllCustomers = () => dbConnection.query('SELECT * FROM customers');

const searchCustomersByCpf = cpf =>
	dbConnection.query('SELECT * FROM customers WHERE cpf = $1;', [`${cpf}%`]);

export { searchAllCustomers, searchCustomersByCpf };
