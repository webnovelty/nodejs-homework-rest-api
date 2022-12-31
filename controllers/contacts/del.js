const { HttpError, ctrlWrapper } = require('../../helpers')
const { Contact } = require('../../schemas')

const del = async (req, res, next) => {

	const { contactId } = req.params;
	const result = await Contact.findByIdAndRemove({ _id: contactId });
	if (!result) {
		throw HttpError(404, 'Not found')
	}
	res.json({ message: "contact deleted" })

}
module.exports = { del: ctrlWrapper(del), }