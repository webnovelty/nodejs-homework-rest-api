const { HttpError, ctrlWrapper } = require('../../helpers')
const { JoiContacts,Contact } = require('../../schemas')

const add = async (req, res, next) => {
	const { _id: owner } = req.user;
	const { name, email, phone } = req.body;
	const { error, value } = JoiContacts.validate({ name: name, email: email, phone: phone });

	if (error) {
		throw HttpError(400, error.message)
	}

	if (!name || !email || !phone) {
		throw HttpError(400, "missing required name field")
	}

	const result = await Contact.create({ ...req.body, owner })
	res.status(201).json(result)
}

module.exports = { add: ctrlWrapper(add), }