/** @format */

const mongoose = require("mongoose");
const Candidate = require("./candidate");
const jobSchema = new mongoose.Schema(
  {
    jobOpeningStatus: {
      type: String,
      required: [true, "Job opening status is required"],
    },
    postingTitle: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Posting Title is required"],
      ref: "PostingTitle",
    },

    department: {
      type: String,
      required: [true, "Department is required"],
    },
    assignedRecruiter: {
      type: String,
      required: [true, "Assigned Recruiter is required"],
    },
    assignedRecruiterEmail: {
      type: String,
      required: [true, "Assigned Recruiter Email is required"],
    },
    jobType: {
      type: String,
      required: [true, "Job Type is required"],
    },
    responsibilities: {
      type: String,
      required: [true, "Responsibilities is required"],
    },
    minWorkExp: {
      type: String,
      required: [true, "Min Work Exp is required"],
    },
    maxWorkExp: {
      type: String,
      required: [true, "Max Work Exp is required"],
    },

    minSalary: {
      type: String,
      required: [true, " Min Salary is required"],
    },
    maxSalary: {
      type: String,
      required: [true, "Max Salary is required"],
    },
    country: {
      type: String,
      required: [true, "Country Is Required"],
    },

    state: {
      type: String,
      required: [true, "State Is Required"],
    },

    city: {
      type: String,
      required: [true, "City Is Required"],
    },
    panel: {
      type: String,
      required: [true, "panel is required"],
    },
    hiringManager: {
      type: String,
      required: [true, "Hiring Manager is Required"],
    },
    hiringManagerEmail: {
      type: String,
      required: [true, "Hiring Manager Email is required"],
    },
    jobDescription: {
      type: String,
    },
    screeningQuestion: [
      { type: mongoose.Schema.ObjectId, ref: "ScreeningQuestion" },
    ],
  },
  {
    toJSON: { virtuals: true },
    // toObject: { virtuals: true }
  }
);

// jobSchema.virtual("candidateCount").get(function () {
// 	const data = new Promise((res, rej) => {
// 		res(Candidate.find({ jobId: this._id }));
// 	});
// 	console.log(data);
// });

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
