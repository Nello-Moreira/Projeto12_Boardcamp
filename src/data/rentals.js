import dbConnection from '../data/connection.js';

const searchAllRentals = () => dbConnection.query(`SELECT * FROM rentals;`);

const searchRentalsByParam = (param, paramValue) =>
	dbConnection.query(`SELECT * FROM rentals WHERE "${param}" = $1;`, [
		paramValue,
	]);

const searchOpenedRentalsByParam = (param, paramValue) =>
	dbConnection.query(
		`SELECT * FROM rentals WHERE "${param}" = $1 AND "returnDate" is NULL;`,
		[paramValue]
	);

const insertRental = ({
	customerId,
	gameId,
	rentDate,
	daysRented,
	returnDate,
	originalPrice,
	delayFee,
}) =>
	dbConnection.query(
		`
    INSERT INTO rentals 
    ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
    VALUES ($1, $2, $3, $4, $5, $6, $7);`,
		[
			customerId,
			gameId,
			rentDate,
			daysRented,
			returnDate,
			originalPrice,
			delayFee,
		]
	);

export {
	searchAllRentals,
	searchRentalsByParam,
	searchOpenedRentalsByParam,
	insertRental,
};
