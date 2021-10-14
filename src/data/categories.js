const getAllCategories = dbConnection =>
	dbConnection.query('SELECT * FROM categories;');

const getCategoryById = (dbConnection, id) =>
	dbConnection.query('SELECT * FROM categories WHERE id = $1;', [id]);

const insertCategory = (dbConnection, name) =>
	dbConnection.query('INSERT INTO categories (name) VALUES ($1);', [name]);

export { getAllCategories, getCategoryById, insertCategory };
