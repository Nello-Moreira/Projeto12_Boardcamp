import Joi from 'joi';

function alreadyExists(obj, listToCompare, keyToCompare) {
	return listToCompare.some(e => e[keyToCompare] === obj[keyToCompare]);
}

const categoryInputValidation = Joi.object({
	name: Joi.string().min(1).required(),
});

const gameInputValidation = Joi.object({
	name: Joi.string().min(1).required(),
	image: Joi.string().uri().required(),
	stockTotal: Joi.number().integer().min(0).required(),
	categoryId: Joi.number().integer().min(0).required(),
	pricePerDay: Joi.number().min(0).required(),
});

export { alreadyExists, categoryInputValidation, gameInputValidation };
