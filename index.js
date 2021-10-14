import express from 'express';
import cors from 'cors';
import pg from 'pg';

import categories from './src/routes/categories.js';

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

//####################### Routes #######################

server.get(categories.route, (req, res) => {
	categories.getCategories(req, res, connection);
});

server.post(categories.route, (req, res) => {
	categories.addCategory(req, res, connection);
});

//####################### Routes #######################

server.listen(port, () => {
	console.log(`server listening on port ${port}`);
});
