import express from 'express';
import cors from 'cors';
import pg from 'pg';

import categories from './src/routes/categories.js';
import games from './src/routes/games.js';
import customers from './src/routes/customers.js';
import rentals from './src/routes/rentals.js';

const port = 4000;
const server = express();
server.use(cors());
server.use(express.json());

const { Pool } = pg;
const config = {
	port: 5432,
	user: 'bootcamp_role',
	password: 'senha_super_hiper_ultra_secreta_do_role_do_bootcamp',
	host: 'localhost',
	database: 'boardcamp',
};
const connection = new Pool(config);

// ####################### categories ####################### //

server.get(categories.route, (req, res) => {
	categories.getAllCategories(req, res, connection);
});

server.post(categories.route, (req, res) => {
	categories.addCategory(req, res, connection);
});

// ####################### games ####################### //

server.get(games.route, (req, res) => {
	games.getAllGames(req, res, connection);
});

server.post(games.route, (req, res) => {
	games.addGame(req, res, connection);
});

// ####################### custumers ####################### //

server.get(customers.route, (req, res) => {
	customers.getAllCustomers(req, res, connection);
});

server.get(customers.route, (req, res) => {
	customers.getCustomer(req, res, connection);
});

server.post(customers.route, (req, res) => {
	customers.addCustomer(req, res, connection);
});

server.put(customers.route, (req, res) => {
	customers.changeCustomer(req, res, connection);
});

// ####################### rentals ####################### //

server.get(rentals.route, (req, res) => {
	rentals.getAllRentals(req, res, connection);
});

server.post(rentals.route, (req, res) => {
	rentals.withdrawRental(req, res, connection);
});

server.post(rentals.route, (req, res) => {
	rentals.returnRental(req, res, connection);
});

server.delete(rentals.route, (req, res) => {
	rentals.removeRental(req, res, connection);
});

// #######################  ####################### //

server.listen(port, () => {
	console.log(`server listening on port ${port}`);
});
