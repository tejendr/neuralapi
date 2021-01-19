/** @format */

const express = require("express");
const router = express.Router();
const {
	getJobs,
	createJob,
	updateJob,
	getOneJob,
	deleteJob
} = require("../../controllers/jobController");
const { route } = require("./candidates");
router.route("/").get(getJobs).post(createJob);
router.route("/:id").get(getOneJob).patch(updateJob).delete(deleteJob);
module.exports = router;
