import dbConnection from '../data/connection.js';

const searchAllCustomers = () => dbConnection.query('SELECT * FROM customers');

const searchCustomersByCpf = cpf =>
	dbConnection.query('SELECT * FROM customers WHERE cpf LIKE $1;', [
		`${cpf}%`,
	]);

const searchCustomersById = id =>
	dbConnection.query('SELECT * FROM customers WHERE id = $1;', [id]);

const insertCustomer = ({ name, phone, cpf, birthday }) =>
	dbConnection.query(
		`
        INSERT INTO customers 
        (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4)`,
		[name, phone, cpf, birthday]
	);

const updateCustomer = ({ id, name, phone, cpf, birthday }) =>
	dbConnection.query(
		`
        UPDATE customers 
        SET (name, phone, cpf, birthday) 
        = ($2, $3, $4, $5) 
        WHERE id = $1`,
		[id, name, phone, cpf, birthday]
	);

export {
	searchAllCustomers,
	searchCustomersByCpf,
	searchCustomersById,
	insertCustomer,
	updateCustomer,
};
