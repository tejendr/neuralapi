/** @format */

const express = require("express");
const router = express.Router();
const {
	getScreeningQuestion,
	createScreeningQuestion,
	updateScreeningQuestion,
	deleteScreeningQuestion,
	getOneScreeningQuestion,
	getScreeningQuestionsByDepartment,
	getGeneralScreeningQuestions,
	getDepartmentBasedScreeningQuestions
} = require("../../controllers/screeningQuestionController");

router.route("/").get(getScreeningQuestion).post(createScreeningQuestion);
router.route("/:department").get(getScreeningQuestionsByDepartment);

router
	.route("/:id")
	.delete(deleteScreeningQuestion)
	.patch(updateScreeningQuestion);

router
	.route("/department/:department")
	.get(getDepartmentBasedScreeningQuestions);
router.get("/general").get(getGeneralScreeningQuestions);

module.exports = router;
