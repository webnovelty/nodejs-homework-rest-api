const { HttpError, ctrlWrapper } = require('../../helpers')
const { JoiUser, User } = require('../../schemas')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

const add = async (req, res, next) => {

	const { email, password } = req.body;
	const { error, value } = JoiUser.validate({ email: email, password: password });
	const user = await User.findOne({ email })
	if (user)
	{
		throw HttpError(409, "Email in use")
	}
	
	if (error) {
		throw HttpError(400, error.message)
	}

	if (!email || !password) {
		throw HttpError(400, "missing required name field")
	}
	const hashPassword = await bcrypt.hash(password, 10)
	
	const avatarURL = gravatar.url(email)

	const result = await User.create({...req.body, password: hashPassword, avatarURL})
	res.status(201).json(result)
}

module.exports = { add: ctrlWrapper(add), }