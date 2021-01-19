/** @format */

const mongoose = require("mongoose");

const screeningQuestionSchema = new mongoose.Schema({
	department: {
		type: String,
		required: [true, "Department Is required"]
	},
	question: {
		type: String,
		required: [true, "Question is required"]
	},
	correctAnswer: {
		type: String,
		required: [true, "Correct Answer is required"]
	},
	questionType: {
		type: String,
		required: [true, "Question Type is required"]
	},
	questionCategory: {
		type: String,
		required: [true, "Question Category is required"]
	},
	checked: {
		type: Boolean,
		default: true
	}
});

const ScreeningQuestion = mongoose.model(
	"ScreeningQuestion",
	screeningQuestionSchema
);

module.exports = ScreeningQuestion;
