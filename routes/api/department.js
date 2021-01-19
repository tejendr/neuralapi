/** @format */

const express = require("express");
const router = express.Router();
const {
	getDepartments,
	createDepartment,
	getOneDepartment,
	updateDepartment,
	deleteDepartment
} = require("../../controllers/departmentController");

router.route("/").get(getDepartments).post(createDepartment);
router
	.route("/:id")
	.get(getOneDepartment)
	.patch(updateDepartment)
	.delete(deleteDepartment);

module.exports = router;
