const { HttpError, ctrlWrapper, sendEmail } = require('../../helpers');
const { JoiUser, User } = require('../../schemas');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const {nanoid} = require('nanoid');

const { BASE_URL } = process.env;

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

	const verificationCode = nanoid()

	const result = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationCode })

	const verifyEmail = {
		to: email,
		subject: "Verify Email",
		html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click verify email</a>`
	}

	await sendEmail(verifyEmail)
		
	res.status(201).json(result)
}

module.exports = { add: ctrlWrapper(add), }