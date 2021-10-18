import { rentalSchema } from '../data/dataValidation.js';

import { searchCustomersById } from '../data/customers.js';
import { searchGameById } from '../data/games.js';
import { searchOpenedRentalsByGameId, insertRental } from '../data/rentals.js';

const route = '/rentals';

async function getAllRentals(request, response) {
	response.sendStatus(501);
}

async function withdrawRental(request, response) {
	const withdrawRequest = request.body;

	const rentalValidation = rentalSchema.validate(withdrawRequest);

	if (rentalValidation.error) {
		response.status(400).send(rentalValidation.error.message);
		return;
	}

	try {
		const customer = (await searchCustomersById(withdrawRequest.customerId))
			.rows;

		if (customer.length === 0) {
			response.status(400).send("This customer doesn't exist.");
			return;
		}

		const game = (await searchGameById(withdrawRequest.gameId)).rows;

		if (game.length === 0) {
			response.status(400).send("This game doesn't exist.");
			return;
		}

		const openedRentals = (
			await searchOpenedRentalsByGameId(withdrawRequest.gameId)
		).rows.length;

		if (openedRentals === game[0].stockTotal) {
			response.status(400).send('There are no games available');
			return;
		}

		withdrawRequest.rentDate = new Date();
		withdrawRequest.originalPrice =
			game[0].pricePerDay * withdrawRequest.daysRented;
		withdrawRequest.returnDate = null;
		withdrawRequest.delayFee = null;

		const successfulInsert = await insertRental(withdrawRequest);
		response.sendStatus(201);
	} catch (error) {
		response
			.status(500)
			.send('There was an internal error. Please try again later.');

		console.log(error);
	}
}

async function returnRental(request, response) {
	response.sendStatus(501);
}

async function removeRental(request, response) {
	response.sendStatus(501);
}

const customers = {
	route,
	getAllRentals,
	withdrawRental,
	returnRental,
	removeRental,
};

export default customers;
