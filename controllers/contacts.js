
const { HttpError, ctrlWrapper } = require('../helpers')
const { Joi, Contact } = require('../schemas/')

const getAll = async (req, res, next) => {
	const result = await Contact.find()
	res.json(result)
}
const getById = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await Contact.findOne({ _id: contactId })
	if (!result) {
		throw HttpError(404, 'Not found')
	}
	res.json(result)
}


const add = async (req, res, next) => {

	const { name, email, phone } = req.body;
	const { error, value } = Joi.validate({ name: name, email: email, phone: phone });

	if (error) {
		throw HttpError(400, error.message)
	}

	if (!name || !email || !phone) {
		throw HttpError(400, "missing required name field")
	}

	const result = await Contact.create({name, email, phone})
	res.status(201).json(result)
}
const del = async (req, res, next) => {

	const { contactId } = req.params;
	const result = await Contact.findByIdAndRemove({ _id: contactId });
	if (!result) {
		throw HttpError(404, 'Not found')
	}
	res.json({ message: "contact deleted" })

}

const put = async (req, res, next) => {

	const { contactId } = req.params;
	const { name, email, phone } = req.body;

	const { error, value } = Joi.validate({ name: name, email: email, phone: phone });

	if (error) {
		throw HttpError(400, error.message)
	}

	if (!name || !email || !phone) {
		throw HttpError(400, 'missing fields')
	}
	const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body);
	res.json(result)

}

const favorite = async (req, res, next) => {

	const { contactId } = req.params;
	const { favorite } = req.body;

	if (!favorite) {
		throw HttpError(400, 'missing field favorite')
	}
	const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
	res.json(result)

}

module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	del: ctrlWrapper(del),
	put: ctrlWrapper(put),
	favorite: ctrlWrapper(favorite),
}