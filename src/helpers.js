import { searchGameById } from './data/games.js';

const internalErrorResponse = (response, error) => {
	response
		.status(500)
		.send('There was an internal error. Please try again later.');

	console.log(error);
};

const calculateDelayFee = async rental => {
	const game = (await searchGameById(rental.gameId)).rows[0];

	const today = new Date(new Date().setHours(0, 0, 0, 0));

	const yesterday = new Date(
		new Date(new Date().setDate(today.getDate() - 1)).setHours(0, 0, 0, 0)
	);
	const MSinADay = today - yesterday;

	const overDueMS =
		today -
		new Date(
			new Date(
				new Date().setDate(
					rental.rentDate.getDate() + rental.daysRented
				)
			).setHours(0, 0, 0, 0)
		);

	if (overDueMS <= 0) return 0;

	const overDueDays = overDueMS / MSinADay;

	console.log(overDueDays);

	return game.pricePerDay * overDueDays;
};

export { internalErrorResponse, calculateDelayFee };
