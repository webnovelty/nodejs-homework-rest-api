const { getAll } = require("./getAll")
const { getById } = require("./getById")
const { add } = require("./add")
const { del } = require("./del")
const { put } = require("./put")
const { favorite } = require("./favorite")

module.exports = {
	getAll, getById, add, del, put, favorite,
}