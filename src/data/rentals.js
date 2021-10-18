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

const updateRental = ({
	id,
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
        UPDATE rentals 
        SET ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")  
        = ($2, $3, $4, $5, $6, $7, $8)
        WHERE id = $1;`,
		[
			id,
			customerId,
			gameId,
			rentDate,
			daysRented,
			returnDate,
			originalPrice,
			delayFee,
		]
	);

const deleteRental = rentalId =>
	dbConnection.query(`DELETE FROM rentals WHERE id = $1;`, [rentalId]);

export {
	searchAllRentals,
	searchRentalsByParam,
	searchOpenedRentalsByParam,
	insertRental,
	updateRental,
	deleteRental,
};
