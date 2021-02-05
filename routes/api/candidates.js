/** @format */
const https = require("https");
const fs = require("fs");
const download = require("download");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "application/pdf" ||
		file.mimetype === "application/msword" ||
		file.mimetype ===
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 5 }
});

const Candidate = require("../../models/candidate");
const Vacancy = require("../../models/vacancy");

//Get Candidates
router.get("/", (req, res) => {
	Object.keys(req.query).forEach(key => {
		try {
			req.query[key] = JSON.parse(req.query[key]);
		} catch (SyntaxError) {}
	});
	console.log("api");
	Candidate.find(req.query)
		.select("-__v")
		.populate("postingTitle")
		.exec()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
});

// Get Candidates based on job id
router.get("/job/:postingTitle", async (req, res) => {
	try {
		const candidates = await Candidate.find({
			jobId: req.params.postingTitle
		});
		res.status(200).json({
			status: "Success",
			results: candidates.length,
			data: { data: candidates }
		});
	} catch (error) {
		res.status(404).json({
			status: "Failed"
		});
	}
});

router.get("/unassigned", async (req, res) => {
	try {
		const candidates = await Candidate.find({
			jobId: { $exists: false }
		});

		res.status(200).json({
			status: "Success",
			result: candidates.length,
			data: { data: candidates }
		});
	} catch (error) {
		res.status(404).json({
			status: "Failed"
		});
	}
});

router.get("/action/:action", async (req, res) => {
	try {
		if (
			req.params.action === "Schedule" ||
			req.params.action === "Disqualify" ||
			req.params.action === "Shortlist" ||
			req.params.action === "Assess Further" ||
			req.params.action === "Future Reference" ||
			req.params.action === "Schedule Later"
		) {
			const candidates = await Candidate.find({
				action: req.params.action
			}).populate({ path: "jobId", populate: { path: "postingTitle" } });

			res.status(200).json({
				status: "Success",
				result: candidates.length,
				data: { data: candidates }
			});
		} else {
			res.status(400).json({
				status: "Failed",
				msg:
					"Please send a valid action which is [Schedule, Disqualify, Shortlist, Assess Further, Future Reference]"
			});
		}
	} catch (error) {
		res.status(404).json({
			status: "Failed"
		});
	}
});

//Add a Candidate
router.post("/", (req, res) => {
	// if (req.body.jobId) {
	// 	const applyingVacancies = req.body.jobId;
	// 	const update = { $inc: { applicationReceived: 1 } };
	// 	Vacancy.find({ _id: { $in: applyingVacancies } })
	// 		.exec()
	// 		.then(result => {

	// 				Vacancy.updateMany({ _id: { $in: applyingVacancies } }, update)
	// 					.exec()
	// 					.then(result => {
	// 						if (result.n === applyingVacancies.length) {
	// 							// req.body.uid = Math.floor(1000000 + Math.random() * 9000000)
	// 							const candidate = new Candidate(req.body);
	// 							candidate
	// 								.save()
	// 								.then(result => {
	// 									res.status(201).json({ createdCandidate: result });
	// 								})
	// 								.catch(err => {
	// 									res.status(500).json({ error: err.message });
	// 								});
	// 						} else {
	// 							res
	// 								.status(500)
	// 								.json({ error: "Update Failed, Invalid jobIds" });
	// 						}
	// 					})
	// 					.catch(err => {
	// 						res.status(500).json({ error: err });
	// 					});
	// 		})
	// 		.catch(err => {
	// 			res.status(500).json({ errror: err });
	// 		});
	// } else {
	const candidate = new Candidate(req.body);
	candidate
		.save()
		.then(result => {
			res.status(201).json({ createdCandidate: result });
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
	// }
});

//add multiple candidiate
router.post("/multiple", async (req, res) => {
	try {
		const candidates = await Candidate.insertMany(req.body);
		res.status(201).json({
			status: "Success",
			data: {
				data: candidates
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
});

//get a candidate

router.get("/:candidateId", (req, res) => {
	const id = req.params.candidateId;
	Candidate.findById(id)
		.select("-__v")
		.populate("postingTitle")
		.exec()
		.then(data => {
			if (data) {
				res.status(200).json(data);
			} else {
				res.status(404).json({ Message: id + " Not Found" });
			}
		})
		.catch(err => {
			res.status(500).json({ error: "Malformed Request" });
		});
});

router.patch("/cv/:uid", async (req, res) => {
	try {
		if (req.body.url) {
			const data = await download(req.body.url);
			res.json({
				status: "Done",
				data: data
			});
		} else {
			res.json({
				status: "Failed",
				message: "Url is required in request body"
			});
		}
	} catch (error) {
		res.json({
			status: "done",
			error: error
		});
	}
});

//update a candidate

router.patch("/:candidateId", upload.single("resume"), (req, res) => {
	if (req.file) {
		req.body.resume = req.file.path;
	}
	const id = req.params.candidateId;
	// if (req.body.jobId) {
	// 	Vacancy.find({ _id: { $in: req.body.jobId } })
	// 		.exec()
	// 		.then(result => {
	// 			// check if the jobids in the patch request exists
	// 			if (result.length !== req.body.jobId.length) {
	// 				res.status(500).json({ message: "Invalid JobIds" });
	// 			} else {
	// 				Candidate.findById(id)
	// 					.exec()
	// 					.then(results => {
	// 						//find candidate in the request
	// 						const removedJobId = [];
	// 						const newJobId = [];
	// 						results.jobId.forEach(jobId => {
	// 							// find the jobIds which were removed
	// 							if (!req.body.jobId.includes(jobId.toString())) {
	// 								removedJobId.push(jobId);
	// 							}
	// 						});
	// 						req.body.jobId.forEach(jobId => {
	// 							// find the new jobIds which were added
	// 							if (!results.jobId.includes(jobId)) {
	// 								newJobId.push(jobId);
	// 							}
	// 						});
	// 						Vacancy.updateMany(
	// 							{ _id: { $in: newJobId } },
	// 							{ $inc: { applicationReceived: 1 } }
	// 						).exec(); // inc/decrement the applicationrecieved
	// 						Vacancy.updateMany(
	// 							{ _id: { $in: removedJobId } },
	// 							{ $inc: { applicationReceived: -1 } }
	// 						).exec();

	// 						Candidate.findByIdAndUpdate(id, req.body, { new: true })
	// 							.exec() //update the candidate
	// 							.then(result => {
	// 								res.status(201).json({ updatedCandidate: result });
	// 							})
	// 							.catch(err => {
	// 								res.status(500).json({ error: err });
	// 							});
	// 					})
	// 					.catch(err => {
	// 						res.status(500).json({ error: err });
	// 					});
	// 			}
	// 		})
	// 		.catch(err => {
	// 			res.status(500).json({ error: "Malformed Request" });
	// 		});
	// } else {
	Candidate.findByIdAndUpdate(id, req.body, { new: true })
		.populate({ path: "jobId", populate: { path: "postingTitle" } })
		.exec()
		// in cases where jobids were not mentioned
		.then(result => {
			res.status(201).json({ updatedCandidate: result });
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
	// }
});

//delete a candidate

router.delete("/:candidateId", async (req, res, next) => {
	try {
		const id = req.params.candidateId;
		await Candidate.findByIdAndDelete(id);
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
	// const update = { $inc: { applicationReceived: -1 } };
	// Candidate.findById(id)
	// 	.exec()
	// 	.then(data => {
	// 		if (data) {
	// 			Vacancy.updateMany({ _id: { $in: data.jobId } }, update)
	// 				.exec() // decrement the application received attribute in vacancy
	// 				.then(result => {
	// 					if (result.n === data.jobId.length) {
	// 						Candidate.deleteOne({ _id: id })
	// 							.exec()
	// 							.then(result => {
	// 								res.status(200).json(result);
	// 							})
	// 							.catch(err => {
	// 								res.status(500).json({ error: err });
	// 							});
	// 					} else {
	// 						res.status(500).json({ error: "Update Failed, Invalid JobIds" });
	// 					}
	// 				})
	// 				.catch(err => {
	// 					res.status(500).json({ error: err });
	// 				});
	// 		} else {
	// 			res.status(404).json({ Message: id + " Not Found" });
	// 		}
	// 	});
});

module.exports = router;
