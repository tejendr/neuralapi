/** @format */

const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
	departmentName: {
		type: String,
		required: [true, "Department Name is required"],
		unique: [true, "Department Must be unique"]
	}
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
