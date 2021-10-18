import dbConnection from '../data/connection.js';

const searchOpenedRentalsByGameId = gameId =>
	dbConnection.query(
		`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" is NULL`,
		[gameId]
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
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
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

export { searchOpenedRentalsByGameId, insertRental };
