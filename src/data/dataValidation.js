import Joi from 'joi';

const categorySchema = Joi.object({
	name: Joi.string().min(1).required(),
});

const gameSchema = Joi.object({
	name: Joi.string().min(1).required(),
	image: Joi.string().uri().required(),
	stockTotal: Joi.number().integer().min(0).required(),
	categoryId: Joi.number().integer().min(0).required(),
	pricePerDay: Joi.number().min(0).required(),
});

const customerSchema = Joi.object({
	name: Joi.string().min(1).required(),
	phone: Joi.string()
		.pattern(/^[0-9]{10,11}$/)
		.required(),
	cpf: Joi.string()
		.pattern(/^[0-9]{11}$/)
		.length(11)
		.required(),
	birthday: Joi.date().less('now').required(),
});

const rentalSchema = Joi.object({
	customerId: Joi.number().integer().min(1).required(),
	gameId: Joi.number().integer().min(1).required(),
	daysRented: Joi.number().integer().min(1).required(),
});

const idsSchema = Joi.number().integer().min(1);

export { categorySchema, gameSchema, customerSchema, rentalSchema, idsSchema };
