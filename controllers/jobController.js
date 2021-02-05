/** @format */
const Candidate = require("../models/candidate");
const Job = require("../models/jobModel");

exports.getJobs = async (req, res) => {
	try {
		const jobs = await Job.find()
			.populate("screeningQuestion")
			.populate("postingTitle");

		const newJobs = await Promise.all(
			jobs.map(async job => {
				const candidateCount = await Candidate.find({ jobId: job._id });
				// console.log(candidateCount.length);
				return { ...job._doc, candidateCount: candidateCount.length };
			})
		);
		console.log(newJobs);

		res.status(200).json({
			status: "success",
			results: newJobs.length,
			data: {
				data: newJobs
			}
		});
	} catch (error) {
		res.status(404).json({
			status: "Failed",
			error: error
		});
	}
};

exports.getOneJob = async (req, res) => {
	try {
		const job = await Job.findById(req.params.id)
			.populate("screeningQuestion")
			.populate("postingTitle");

		res.status(200).json({
			status: "success",
			data: {
				data: job
			}
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			error: {
				message: error.message
			}
		});
	}
};

exports.createJob = async (req, res) => {
	try {
		const job = await Job.create(req.body);
		const jobPopulated = await Job.findById(job._id)
			.populate("screeningQuestion")
			.populate("postingTitle");

		res.status(201).json({
			status: "success",
			data: {
				data: jobPopulated
			}
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			error: {
				message: error.message
			}
		});
	}
};

exports.updateJob = async (req, res) => {
	try {
		const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		const jobPopulated = await Job.findById(job._id)
			.populate("screeningQuestion")
			.populate("postingTitle");

		res.status(200).json({
			status: "Success",
			data: {
				data: jobPopulated
			}
		});
	} catch (error) {
		res.status(400).json({
			status: "Fail",
			error: {
				message: error.message
			}
		});
	}
};

exports.deleteJob = async (req, res) => {
	try {
		const candidates = await Candidate.find({ jobId: req.params.id });
		const newCandidates = await Promise.all(
			candidates.map(
				async candidate =>
					await Candidate.findByIdAndUpdate(
						candidate._id,
						{ $unset: { jobId: 1 } },
						{ new: true, runValidators: true }
					)
			)
		);

		await Job.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: "success",
			data: null
		});
	} catch (error) {
		res.status(400).json({
			status: "Fail",
			error: {
				message: error.message
			}
		});
	}
};
