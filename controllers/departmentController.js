/** @format */

const Department = require("../models/departmentModel");

exports.getDepartments = async (req, res) => {
	try {
		const departments = await Department.find();

		res.status(200).json({
			status: "success",
			results: departments.length,
			data: {
				data: departments
			}
		});
	} catch (error) {
		res.status(404).json({
			status: "Failed",
			error: error
		});
	}
};

exports.createDepartment = async (req, res) => {
	try {
		const department = await Department.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				data: department
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

exports.updateDepartment = async (req, res) => {
	try {
		const department = await Department.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			status: "Success",
			data: {
				data: department
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
exports.deleteDepartment = async (req, res) => {
	try {
		await Department.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: "Success",
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

exports.getOneDepartment = async (req, res) => {
	try {
		const department = await Department.findById(req.params.id);

		res.status(200).json({
			status: "success",
			data: {
				data: department
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
