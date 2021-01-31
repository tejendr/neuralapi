/** @format */

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	candidateId: {
		type: mongoose.Schema.ObjectId,
		required: [true, "Candidate Id is required"],
		ref: "Candidate"
	},
	chats: [
		{
			text: {
				type: String,
				required: [true, "Text is required"]
			},
			createdAt: {
				type: Date,
				default: Date.now()
			},
			sender: {
				type: String,
				required: [true, "Sender is required"]
			}
		}
	]
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
