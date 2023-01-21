const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SYSTEMCONTACTS } = process.env;

sgMail.setApiKey(SYSTEMCONTACTS);

const sendEmail = async (data) => {
	const email = { ...data, from: "webnoveltystudio@gmail.com" }
	await sgMail.send(email)
	return true

}

module.exports = sendEmail;