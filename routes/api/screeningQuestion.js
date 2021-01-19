/** @format */

const express = require("express");
const router = express.Router();
const {
	getScreeningQuestion,
	createScreeningQuestion,
	updateScreeningQuestion,
	deleteScreeningQuestion,
	getOneScreeningQuestion,
	getScreeningQuestionsByDepartment
} = require("../../controllers/screeningQuestionController");

router.route("/").get(getScreeningQuestion).post(createScreeningQuestion);
router.route("/:department").get(getScreeningQuestionsByDepartment);

module.exports = router;
