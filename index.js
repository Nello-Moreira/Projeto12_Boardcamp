import express from 'express';
import cors from 'cors';

import categories from './src/routes/categories.js';
import games from './src/routes/games.js';
import customers from './src/routes/customers.js';
import rentals from './src/routes/rentals.js';

const port = 4000;
const server = express();
server.use(cors());
server.use(express.json());

// ####################### categories ####################### //

server.get(categories.route, categories.getAllCategories);

server.post(categories.route, categories.addCategory);

// ####################### games ####################### //

server.get(games.route, games.getAllGames);

server.post(games.route, games.addGame);

// ####################### custumers ####################### //

server.get(customers.route, customers.getAllCustomers);

server.get(customers.route + '/:id', customers.getCustomerById);

server.post(customers.route, customers.addCustomer);

server.put(customers.route + '/:id', customers.changeCustomer);

// ####################### rentals ####################### //

server.get(rentals.route, rentals.getAllRentals);

server.post(rentals.route, rentals.withdrawRental);

server.post(rentals.route, rentals.returnRental);

server.delete(rentals.route, rentals.removeRental);

// #######################  ####################### //

server.listen(port, () => {
	console.log(`server listening on port ${port}`);
});
