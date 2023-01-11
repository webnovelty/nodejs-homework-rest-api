const fs = require("fs/promises")
const { ctrlWrapper } = require('../../helpers')
const path = require('path')
const { User } = require('../../schemas')
const Jimp = require('jimp')

const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const textFile = async (req, res) => {
	const { _id } = req.user
	const { path: tempUpload, filename } = req.file
	const newFileName = `${_id}_${filename}`




	const resUpload = path.join(avatarsDir, newFileName)


	async function resize() {
		
		const image = await Jimp.read(tempUpload);
		await image.resize(256, 256);
		await image.writeAsync(resUpload);
	}
	resize();

	await fs.rename(tempUpload, resUpload)

	const avatarURL = path.join("avatars", newFileName)
	await User.findByIdAndUpdate(_id, { avatarURL })

	res.json({
		avatarURL
	})

}

module.exports = {
	textFile: ctrlWrapper(textFile),
}