const { HttpError, ctrlWrapper } = require('../../helpers')
const { JoiUser, User } = require('../../schemas')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { SECRET_KEY } = process.env;
const login = async (req, res, next) => {

	const { email, password } = req.body;
	const { error, value } = JoiUser.validate({ email: email, password: password });
	const user = await User.findOne({ email })
	if (!user) {
		throw HttpError(401, "Email or password invalid")
	}

	if (!user.verify) {
		throw HttpError(401, "User not found")
	}

	if (error) {
		throw HttpError(400, error.message)
	}

	if (!email || !password) {
		throw HttpError(400, "missing required name field")
	}
	const passwordCompare = await bcrypt.compare(password, user.password);

	if (!passwordCompare) {
		throw HttpError(401, "Email or password invalid")
	}
	const payload = {
		id: user._id,
	}
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
	await User.findByIdAndUpdate(user._id, { token })

	res.json({
		token,
		email: user.email,

	})
}

module.exports = { login: ctrlWrapper(login), }