import { searchGameById } from './data/games.js';

const calculateDelayFee = async rental => {
	try {
		const game = (await searchGameById(rental.gameId)).rows[0];

		const today = new Date(new Date().setHours(0, 0, 0, 0));

		const yesterday = new Date(
			new Date(new Date().setDate(today.getDate() - 1)).setHours(
				0,
				0,
				0,
				0
			)
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
	} catch (error) {}
};

export { calculateDelayFee };
