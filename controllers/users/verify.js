const { User } = require("../../schemas");
const { HttpError, ctrlWrapper } = require('../../helpers')

const verify = async (req, res) => {

	const { verificationCode } = req.params;
	const user = await User.findOne({ verificationCode });
	const { email } = req.body;
	if (!user)
	{
		throw HttpError(404, "User not found")
	}

	if (!email) {
		throw HttpError(400, "Missing required field email");
	}

	if (user.verify) {
		res.status(400).json({
			status: "Bad Request",
			code: 400,
			message: "Verification has already been passed",
		});
	}

	
	

	

	await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: "" })
	
	res.json({
		message: "Verify success"
	})
}

module.exports = {
	verify: ctrlWrapper(verify),
}