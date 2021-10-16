import dbConnection from '../data/connection.js';

const searchAllCategories = () =>
	dbConnection.query('SELECT * FROM categories;');

const searchCategoryById = id =>
	dbConnection.query('SELECT * FROM categories WHERE id = $1;', [id]);

const searchCategoryByName = name =>
	dbConnection.query('SELECT * FROM categories WHERE name ILIKE $1;', [name]);

const insertCategory = name =>
	dbConnection.query('INSERT INTO categories (name) VALUES ($1);', [name]);

export {
	searchAllCategories,
	searchCategoryById,
	searchCategoryByName,
	insertCategory,
};
