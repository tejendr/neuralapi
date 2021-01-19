/** @format */

const ScreeningQuestion = require("../models/screeningQuestion");

exports.getScreeningQuestion = async (req, res) => {
	try {
		const screeningQuestion = await ScreeningQuestion.find();

		res.status(200).json({
			status: "success",
			results: screeningQuestion.length,
			data: {
				data: screeningQuestion
			}
		});
	} catch (error) {
		res.status(404).json({
			status: "Failed",
			error: error
		});
	}
};

exports.getScreeningQuestionsByDepartment = async (req, res) => {
	try {
		const screeningQuestion = await ScreeningQuestion.find({
			department: req.params.department
		});

		res.status(200).json({
			status: "success",
			data: {
				data: screeningQuestion
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

exports.createScreeningQuestion = async (req, res) => {
	try {
		const screeningQuestion = await ScreeningQuestion.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				data: screeningQuestion
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

exports.updateScreeningQuestion = async (req, res) => {
	try {
		const screeningQuestion = await ScreeningQuestion.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			status: "Success",
			data: {
				data: screeningQuestion
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

exports.deleteScreeningQuestion = async (req, res) => {
	try {
		await ScreeningQuestion.findByIdAndDelete(req.params.id);

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

exports.getOneScreeningQuestion = async (req, res) => {
	try {
		const screeningQuestion = await ScreeningQuestion.findById(req.params.id);

		res.status(200).json({
			status: "success",
			data: {
				data: screeningQuestion
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
