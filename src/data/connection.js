import pg from 'pg';

const { Pool } = pg;

const config = {
	port: 5432,
	user: 'bootcamp_role',
	password: 'senha_super_hiper_ultra_secreta_do_role_do_bootcamp',
	host: 'localhost',
	database: 'boardcamp',
};

const dbConnection = new Pool(config);

export default dbConnection;
