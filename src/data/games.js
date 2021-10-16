import dbConnection from '../data/connection.js';

const searchAllGames = () =>
	dbConnection.query(
		`SELECT 
            games.id, 
            games.name, 
            games.image,
            games."stockTotal", 
            games."categoryId", 
            games."pricePerDay", 
            categories.name as "categoryName" 
        FROM games 
        JOIN categories ON games."categoryId" = categories.id;`
	);

const searchGameByName = name =>
	dbConnection.query(
		`SELECT 
            games.id, 
            games.name, 
            games.image,
            games."stockTotal", 
            games."categoryId", 
            games."pricePerDay", 
            categories.name as "categoryName" 
        FROM games 
        JOIN categories ON games."categoryId" = categories.id
        WHERE games.name ILIKE $1;`,
		[`%${name}%`]
	);

const insertGame = ({ name, image, stockTotal, categoryId, pricePerDay }) =>
	dbConnection.query(
		`INSERT INTO 
        games (name, image, "stockTotal", "categoryId", "pricePerDay") 
        VALUES ($1, $2, $3, $4, $5);`,
		[name, image, stockTotal, categoryId, pricePerDay]
	);

export { searchAllGames, searchGameByName, insertGame };
