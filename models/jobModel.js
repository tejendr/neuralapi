/** @format */

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
	jobOpeningStatus: {
		type: String,
		required: [true, "Job opening status is required"]
	},
	postingTitle: {
		type: mongoose.Schema.ObjectId,
		required: [true, "Posting Title is required"],
		ref: "PostingTitle"
	},
	department: {
		type: String,
		required: [true, "Department is required"]
	},
	assignedRecruiter: {
		type: String,
		required: [true, "Assigned Recruiter is required"]
	},
	jobType: {
		type: String,
		required: [true, "Job Type is required"]
	},
	responsibilities: {
		type: String,
		required: [true, "Responsibilities is required"]
	},
	workExp: {
		type: String,
		required: [true, "Work Exp is required"]
	},
	salaryRange: {
		type: String,
		required: [true, "Salary Range is required"]
	},
	country: {
		type: String,
		required: [true, "Country Is Required"]
	},

	state: {
		type: String,
		required: [true, "State Is Required"]
	},

	city: {
		type: String,
		required: [true, "City Is Required"]
	},
	screeningQuestion: [
		{ type: mongoose.Schema.ObjectId, ref: "ScreeningQuestion" }
	]
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
