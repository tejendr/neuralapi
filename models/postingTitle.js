/** @format */

const mongoose = require("mongoose");

const postingTitleSchema = new mongoose.Schema({
	postingTitle: {
		type: String,
		required: [true, "Posting Title is required"],
		unique: [true, "Posting Title must be unique"]
	}
});

const PostingTitle = mongoose.model("PostingTitle", postingTitleSchema);

module.exports = PostingTitle;
