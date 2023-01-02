const { HttpError, ctrlWrapper } = require('../../helpers')
const { Contact } = require('../../schemas')

const favorite = async (req, res, next) => {

	const { contactId } = req.params;
	const { favorite } = req.body;

	if (!favorite) {
		throw HttpError(400, 'missing field favorite')
	}
	const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
	res.json(result)

}

module.exports = { favorite: ctrlWrapper(favorite), }