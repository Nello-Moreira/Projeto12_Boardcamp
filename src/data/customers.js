const searchAllCustomers = dbConnection =>
	dbConnection.query('SELECT * FROM customers');

const searchCustomersByCpf = (dbConnection, cpf) =>
	dbConnection.query('SELECT * FROM customers WHERE cpf = $1;', [`${cpf}%`]);

export { searchAllCustomers, searchCustomersByCpf };
