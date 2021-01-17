/** @format */

const mongoose = require("mongoose");

const chatFormat = mongoose.Schema(
	{
		sender: String,
		text: String,
		createdAt: Number,
		updatedAt: Number
	},
	{ timestamps: { currentTime: () => Date.now() } }
);

const chatSchema = mongoose.Schema({
	candidateId: {
		type: mongoose.Types.ObjectId,
		ref: "Candidate"
	},
	uid: {
		type: String
	},
	chat: {
		type: [chatFormat],
		required: true
	}
});

module.exports = mongoose.model("Chat", chatSchema);
