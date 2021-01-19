/** @format */

const PostingTitle = require("../models/postingTitle");

exports.getPostingTitles = async (req, res) => {
	try {
		const postingTitles = await PostingTitle.find();

		res.status(200).json({
			status: "success",
			results: postingTitles.length,
			data: {
				data: postingTitles
			}
		});
	} catch (error) {
		res.status(404).json({
			status: "Failed",
			error: error
		});
	}
};

exports.createPostingTitle = async (req, res) => {
	try {
		const postingTitle = await PostingTitle.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				data: postingTitle
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

exports.updatePostingTitle = async (req, res) => {
	try {
		const postingTitle = await PostingTitle.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			status: "Success",
			data: {
				data: postingTitle
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
exports.deletePostingTitle = async (req, res) => {
	try {
		await PostingTitle.findByIdAndDelete(req.params.id);

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

exports.getOnePostingTitle = async (req, res) => {
	try {
		const postingTitle = await PostingTitle.findById(req.params.id);

		res.status(200).json({
			status: "success",
			data: {
				data: postingTitle
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
