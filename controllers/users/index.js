
const { add } = require("./add")
const { login } = require("./login")
const { getCurrent } = require("./getCurrent")
const { logout } = require("./logout")
const { textFile } = require('./textFile')
const { verify } = require('./verify')


module.exports = {
	add, login, getCurrent, logout, textFile, verify,
}