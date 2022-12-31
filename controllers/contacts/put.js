const { HttpError, ctrlWrapper } = require('../../helpers')
const { JoiContacts, Contact } = require('../../schemas')


const put = async (req, res, next) => {

	const { contactId } = req.params;
	const { name, email, phone } = req.body;

	const { error, value } = JoiContacts.validate({ name: name, email: email, phone: phone });

	if (error) {
		throw HttpError(400, error.message)
	}

	if (!name || !email || !phone) {
		throw HttpError(400, 'missing fields')
	}
	const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body);
	res.json(result)

}


module.exports = { put: ctrlWrapper(put), }