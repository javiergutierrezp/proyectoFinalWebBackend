const validator = require('validator')
const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
	question: {
		type: String,
		required: true
	},
	answer: {
		type: String,
		required : true
	},
	createdBy: {
	  type: mongoose.Schema.Types.ObjectId,
	  required: true,
	  ref: 'User'
	}
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post