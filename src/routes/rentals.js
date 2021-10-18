import { rentalSchema, idsSchema } from '../data/dataValidation.js';

import { searchAllCustomers, searchCustomersById } from '../data/customers.js';
import { searchAllGames, searchGameById } from '../data/games.js';
import {
	searchAllRentals,
	searchRentalsByParam,
	searchOpenedRentalsByParam,
	insertRental,
	updateRental,
	deleteRental,
} from '../data/rentals.js';

import { internalErrorResponse, calculateDelayFee } from '../helpers.js';

const route = '/rentals';

async function getAllRentals(response) {
	const customers = (await searchAllCustomers()).rows;
	const games = (await searchAllGames()).rows;

	let rentals = (await searchAllRentals()).rows;

	rentals = rentals.map(rental => {
		const customer = customers.filter(
			customer => customer.id === rental.customerId
		)[0];
		const game = games.filter(game => game.id === rental.gameId)[0];

		return {
			...rental,
			customer: { id: customer.id, name: customer.name },
			game: {
				id: game.id,
				name: game.name,
				categoryId: game.categoryId,
				categoryName: game.categoryName,
			},
		};
	});

	response.status(200).send(rentals);
}

async function getRentalsByCustomerId(response, customerId) {
	const idValidation = idsSchema.validate(customerId);

	if (idValidation.error) {
		response.status(400).send(idValidation.error.message);
		return;
	}

	const customers = (await searchCustomersById(customerId)).rows;
	const games = (await searchAllGames()).rows;
	let rentals = (await searchRentalsByParam('customerId', customerId)).rows;

	rentals = rentals.map(rental => {
		const customer = customers[0];
		const game = games.filter(game => game.id === rental.gameId)[0];

		return {
			...rental,
			customer: { id: customer.id, name: customer.name },
			game: {
				id: game.id,
				name: game.name,
				categoryId: game.categoryId,
				categoryName: game.categoryName,
			},
		};
	});
	response.status(200).send(rentals);
}

async function getRentalsByGameId(response, gameId) {
	const idValidation = idsSchema.validate(gameId);

	if (idValidation.error) {
		response.status(400).send(idValidation.error.message);
		return;
	}

	const customers = (await searchAllCustomers()).rows;
	const games = (await searchGameById(gameId)).rows;
	let rentals = (await searchRentalsByParam('gameId', gameId)).rows;

	rentals = rentals.map(rental => {
		const customer = customers.filter(
			customer => customer.id === rental.customerId
		)[0];
		const game = games[0];

		return {
			...rental,
			customer: { id: customer.id, name: customer.name },
			game: {
				id: game.id,
				name: game.name,
				categoryId: game.categoryId,
				categoryName: game.categoryName,
			},
		};
	});
	response.status(200).send(rentals);
}

async function getRentals(request, response) {
	const { customerId, gameId } = request.query;

	try {
		if (customerId) {
			getRentalsByCustomerId(response, customerId);
			return;
		}

		if (gameId) {
			getRentalsByGameId(response, gameId);
			return;
		}

		getAllRentals(response);
	} catch (error) {
		internalErrorResponse(response, error);
	}
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
			await searchOpenedRentalsByParam('gameId', withdrawRequest.gameId)
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
		internalErrorResponse(response, error);
	}
}

async function returnRental(request, response) {
	const { id } = request.params;
	const rentalId = Number(id);

	const idValidation = idsSchema.validate(rentalId);

	if (idValidation.error) {
		response.status(400).send(idValidation.error.message);
		return;
	}

	try {
		let rental = (await searchRentalsByParam('id', rentalId)).rows;

		if (rental.length === 0) {
			response
				.status(404)
				.send(`There is no rental with id = ${rentalId}`);
			return;
		}

		rental = rental[0];

		if (rental.returnDate !== null) {
			response.status(400);
			return;
		}

		rental = {
			...rental,
			returnDate: new Date(),
			delayFee: await calculateDelayFee(rental),
		};

		const successfulReturn = await updateRental(rental);
		response.sendStatus(200);
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

async function removeRental(request, response) {
	const { id } = request.params;
	const rentalId = Number(id);

	const idValidation = idsSchema.validate(rentalId);

	if (idValidation.error) {
		response.status(400).send(idValidation.error.message);
		return;
	}

	try {
		const rental = (await searchRentalsByParam('id', rentalId)).rows;

		if (rental.length === 0) {
			response
				.status(404)
				.send(`There is no rental with id = ${rentalId}`);
			return;
		}

		if (rental[0].returnDate !== null) {
			response.sendStatus(400);
			return;
		}

		const successfulDelete = await deleteRental(rentalId);
		response.sendStatus(200);
	} catch (error) {
		internalErrorResponse(response, error);
	}
}

const customers = {
	route,
	getRentals,
	withdrawRental,
	returnRental,
	removeRental,
};

export default customers;
